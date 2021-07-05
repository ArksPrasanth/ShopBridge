import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InventoryManagementService } from './inventory-management.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// import {} from'./assets/

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css']
})
export class InventoryManagementComponent implements OnInit {
  inventoryList: any = [];
  title = 'Inventory Details';
  closeResult: any;
  iadd: boolean = false;
  selectedItem: any;
  constructor(private inventory: InventoryManagementService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.InventoryLoad();
  }
  add(content: any) {
    this.selectedItem = '';
    this.iadd = true;
    this.title = 'Add Inventory';
    this.open(content);

  }
  InventoryLoad() {
    this.inventory.LoadInventory().subscribe(inventory => {
      this.inventoryList = inventory.body;
    });
  }
  InventoryAdd(inventoryAdd: any) {
    this.inventory.AddInventory(inventoryAdd).subscribe(inventory => {
      console.log('Added successfully');
      console.log(inventory);
      //this.selectionValue='';
      this.InventoryLoad();
      //this.inventoryList.push(this.inventoryAdd);
    });
  }
  InventoryDelete() {
    // console.log(event);
    this.inventory.DeleteInventory(this.selectedItem.id).subscribe(inventory => {
      console.log('Deleted successfully');
      console.log(inventory);
      this.InventoryLoad();
      // delete this.inventoryList[inventory];
      //this.inventoryList.pop(inventory);
    });
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.InventoryLoad();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.InventoryLoad();
      return 'by clicking on a backdrop';
    } else {
      this.InventoryLoad();
      return `with: ${reason}`;
    }
  }

  submit(inventoryForm: NgForm) {
    console.log(inventoryForm);
    console.log(inventoryForm.value);
    if (this.iadd) {
      this.InventoryAdd(inventoryForm.value);
    } else {
      this.InventoryUpdate(inventoryForm.value);
    }
  }
  InventoryUpdate(inventoryAdd: any) {
    //console.log(this.selectedItem);
    this.inventory.UpdateInventory(this.selectedItem.id, inventoryAdd).subscribe(inventory => {
      console.log('Updated successfully');
      console.log(inventory);
      this.InventoryLoad();
      //this.inventoryList.push(this.inventoryAdd);
    });
  };

}
