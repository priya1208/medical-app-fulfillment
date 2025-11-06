import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { MedicineService } from '../../services/medicineservice';
import { CartService } from '../../services/cartservice';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  displayedMedicines: any[] = [];
  orderList: any[] = [];
  searchTerm: string = '';
  loading = false;
  errorMessage: string = '';

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private auth: Auth,
    private medicineService: MedicineService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.displayedMedicines = [];

    // 🕒 Debounced search: triggers only after user stops typing
    this.searchSubject
      .pipe(
        debounceTime(500), // wait 0.5 sec after typing stops
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((term) => this.fetchMedicines(term));
  }

  // called on every keyup, but API runs only after debounce
  onSearch(): void {
    this.searchSubject.next(this.searchTerm.trim());
  }

  private fetchMedicines(term: string): void {
    if (!term) {
      this.errorMessage = 'Please enter a medicine name.';
      this.displayedMedicines = [];
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.medicineService.searchMedicines(term).subscribe({
      next: (res: any) => {
        console.log('🧾 API Response:', res);
        this.loading = false;

        if (res?.data?.result?.length > 0) {
          this.displayedMedicines = res.data.result;
        } else {
          this.displayedMedicines = [];
          this.errorMessage = 'No medicines found.';
        }
      },
      error: (err) => {
        console.error('❌ API Error:', err);
        this.loading = false;
        this.displayedMedicines = [];
        this.errorMessage = 'Failed to fetch medicines. Please try again.';
      },
    });
  }

  addToOrder(med: any): void {
    if (!this.isAdded(med)) {
      this.orderList.push({ ...med, qty: 1 });
    }
  }

  removeFromOrder(med: any): void {
    this.orderList = this.orderList.filter(
      (m) => m.medicine_id !== med.medicine_id
    );
  }

  isAdded(med: any): boolean {
    return this.orderList.some((m) => m.medicine_id === med.medicine_id);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  proceedToCheckout(): void {
    const orderListWithQty = this.orderList.map((med) => ({
      ...med,
      qty: med.qty || 1,
    }));
    this.cart.setMedicines(orderListWithQty);
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
