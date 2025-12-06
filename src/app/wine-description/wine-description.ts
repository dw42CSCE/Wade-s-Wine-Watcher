import { Component, OnInit } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WineService } from '../services/wineservice';
import { Wine } from '../models/wine.model';

@Component({
  selector: 'app-wine-description',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wine-description.html',
  styleUrl: './wine-description.css'
})
export class WineDescription implements OnInit {

  editForm!: FormGroup;
  wineId?: number;
  isLoadingWine = false;
  isSaving = false;
  loadError = '';
  saveError = '';
  successMessage = '';
  events: any[] = []; // placeholder until event logic exists

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private wineServ: WineService
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      startDate: ['', Validators.required],
      startSpecificGravity: ['', Validators.required],
      endSpecificGravity: ['', Validators.required],
      ingredients: [''],
      rackDates: ['']
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    this.wineId = idParam ? Number(idParam) : undefined;
    if (!this.wineId) {
      this.loadError = 'Missing wine id in route.';
      return;
    }
    this.loadWine(this.wineId);
  }

  loadWine(id: number) {
    this.isLoadingWine = true;
    this.loadError = '';
    this.wineServ.getWine(id).subscribe({
      next: (wine: Wine) => {
        this.isLoadingWine = false;
        this.patchForm(wine);
      },
      error: (err) => {
        this.isLoadingWine = false;
        this.loadError = 'Unable to load wine. Please try again or return to the dashboard.';
        console.error('Load wine failed', err);
      }
    });
  }

  patchForm(wine: Wine) {
    this.editForm.patchValue({
      name: wine.name,
      description: wine.description,
      startDate: wine.startDate ? this.toDateInput(wine.startDate) : '',
      startSpecificGravity: wine.startSpecificGravity,
      endSpecificGravity: wine.endSpecificGravity,
      ingredients: Array.isArray(wine.ingredients) ? wine.ingredients.join(', ') : wine.ingredients,
      rackDates: Array.isArray(wine.rackDates)
        ? wine.rackDates.map(d => this.toDateInput(d)).join(', ')
        : ''
    });
  }

  submit() {
    if (!this.wineId || this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    this.saveError = '';
    this.successMessage = '';

    const formValue = this.editForm.value;
    const dto = {
      Id: this.wineId,
      Name: formValue.name,
      Description: formValue.description,
      StartDate: formValue.startDate ? new Date(formValue.startDate) : null,
      StartSpecificGravity: Number(formValue.startSpecificGravity),
      EndSpecificGravity: Number(formValue.endSpecificGravity),
      Ingredients: this.toList(formValue.ingredients),
      RackDates: this.toDateList(formValue.rackDates)
    };

    this.wineServ.updateWine(dto).subscribe({
      next: () => {
        this.isSaving = false;
        this.successMessage = 'Wine updated successfully.';
      },
      error: (err) => {
        this.isSaving = false;
        this.saveError = err.error?.message || 'Unable to update wine. Please review your inputs and try again.';
        console.error('Update wine failed', err);
      }
    });
  }

  toList(raw: string): string[] {
    if (!raw) return [];
    return raw.split(',').map(x => x.trim()).filter(x => x.length > 0);
  }

  toDateList(raw: string): Date[] {
    if (!raw) return [];
    return raw.split(',')
      .map(x => x.trim())
      .filter(x => x.length > 0)
      .map(x => new Date(x));
  }

  toDateInput(value: Date | string): string {
    const d = new Date(value);
    if (isNaN(d.getTime())) {
      return '';
    }
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }

  goBack() {
    this.location.back();
  }

}
