import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-checklist',
  imports: [],
  templateUrl: './checklist.html',
  styleUrl: './checklist.scss'
})
export class Checklist {
  private router = inject(Router);
  
  checklistItems = signal<ChecklistItem[]>([
    { id: 1, text: 'Phone in another room', completed: false },
    { id: 2, text: 'Water bottle ready', completed: false },
    { id: 3, text: 'Workspace organized', completed: false },
    { id: 4, text: 'Notifications turned off', completed: false }
  ]);
  
  newItemText = signal('');
  editingItemId = signal<number | null>(null);
  editingText = signal('');
  
  completedCount = computed(() => 
    this.checklistItems().filter(item => item.completed).length
  );
  
  progressPercentage = computed(() => 
    this.checklistItems().length > 0 
      ? (this.completedCount() / this.checklistItems().length) * 100 
      : 0
  );
  
  toggleItem(id: number) {
    this.checklistItems.update(items => 
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }
  
  deleteItem(id: number) {
    this.checklistItems.update(items => 
      items.filter(item => item.id !== id)
    );
  }
  
  updateNewItemText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.newItemText.set(target.value);
  }
  
  updateEditingText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.editingText.set(target.value);
  }
  
  startEdit(id: number, text: string) {
    this.editingItemId.set(id);
    this.editingText.set(text);
  }
  
  saveEdit() {
    const id = this.editingItemId();
    const newText = this.editingText().trim();
    
    if (id && newText) {
      this.checklistItems.update(items => 
        items.map(item => 
          item.id === id ? { ...item, text: newText } : item
        )
      );
    }
    
    this.cancelEdit();
  }
  
  cancelEdit() {
    this.editingItemId.set(null);
    this.editingText.set('');
  }
  
  addItem() {
    const text = this.newItemText().trim();
    if (text) {
      const newId = Math.max(...this.checklistItems().map(item => item.id), 0) + 1;
      this.checklistItems.update(items => [
        ...items,
        { id: newId, text, completed: false }
      ]);
      this.newItemText.set('');
    }
  }
  
  goBack() {
    this.router.navigate(['/welcome']);
  }
  
  continue() {
    this.router.navigate(['/sounds']);
  }
}
