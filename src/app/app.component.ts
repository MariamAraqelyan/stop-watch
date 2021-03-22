import {Component, OnInit} from '@angular/core';
import items from "../assets/files/items.json";
import {Item} from "./core/models/item";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private itemList: any = [];
  public currentItemsList: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
    const itemListJsonData: Item[] = items.map(item => new Item(item));
    this.listToTree(itemListJsonData);
  }

  listToTree(list) {
    for (const fileItem of list) {
      const currentPathData = fileItem.path.split('/');
      fileItem.parentId = (currentPathData.length > 1) ? currentPathData[currentPathData.length - 2] : null;
      if (!fileItem.children?.length) {
        fileItem.children = [];
      }
      if (fileItem.parentId !== null) {
        for (const fileSubItem of list) {
          const currentPathData = fileSubItem.path.split('/');
          if (currentPathData.pop() === fileItem.parentId) {
            if (!fileSubItem.children?.length) {
              fileSubItem.children = [];
            }
            fileSubItem.children.push(fileItem);
          }
        }
      }
    }

    this.itemList = list;
    this.currentItemsList = this.itemList.filter(data => data.parentId === null);
  }

  onItemCLick(event: any) {
    this.currentItemsList = this.itemList.filter(data => data.path === event)[0].children;
  }

  setCurrentPath() {
    const pathArr = this.currentItemsList[0].path.split('/');
    return pathArr.slice(0, pathArr.length - 1).join('/');
  }

  onSearch(word) {
    if (word) {
      this.currentItemsList = this.itemList.filter(data => data.path.includes(word))[0]?.children || [];
    } else {
      this.currentItemsList = this.itemList.filter(data => data.parentId === null);
    }
  }

  goBack(parent: string) {
    this.currentItemsList = this.itemList.filter(data => data.parentId === parent);
  }
}
