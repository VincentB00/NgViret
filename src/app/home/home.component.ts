import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { AfterViewChecked, Component, DoCheck, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { first } from 'rxjs';
import { InputDialog } from '../dialog/input-dialog/input-dialog.component';
import { FlatNode, Group, GroupNode } from '../shared/models/group.model';
import { GroupService } from '../shared/services/group.service';
import { TouchBarService } from '../shared/services/touch-bar.service';
import { HomeDetailComponent } from './home-detail/home-detail.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck, AfterViewChecked{

  @ViewChild(HomeDetailComponent)
  homeDetailComponent!: HomeDetailComponent;

  filter: string = '';

  selectedGroupID: number = 0;

  relatedGroups: Group[] = [];

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
  constructor(
    private matDialog: MatDialog, 
    private groupService: GroupService,
    public touchBar: TouchBarService) 
  {

  }
  
  ngOnInit(): void 
  {
    this.updateTree();
  }

  ngDoCheck(): void 
  {
    
  }

  ngAfterViewChecked(): void 
  {
    if(this.groupService.haveChange)
    {
      this.updateTree();
      this.groupService.haveChange = false;
    }
  }

  private _transformer(node: GroupNode, level: number)
  {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      path: node.path,
      groupID: node.groupID
    };
  };

  updateTree()
  {
    this.groupService.getAllGroupNode().pipe(first()).subscribe(
      res => {
        if(JSON.stringify(this.dataSource.data) !== JSON.stringify(res))
          this.dataSource.data = [...res]
      }
    );

    this.groupService.getAllRelatedGroup().pipe(first()).subscribe(
      res => {
        if(JSON.stringify(this.relatedGroups) !== JSON.stringify(res))
          this.relatedGroups = res;
      }
    );
  }

  

  hasChild = (_: number, node: FlatNode) => node.expandable;

  addEmptyGroup(): void
  {
    let dialog = this.matDialog.open(InputDialog , {data: {title: 'Group name', yes: 'Save', no: 'Cancel', multipleLine: false}});

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
        {
          let group: Group = {
            name: res,
            path: res.toLowerCase(),
            group_users: []
          }
          this.groupService.createGroup(group).pipe(first()).subscribe(
            res => this.updateTree()
          );
        }
      }
    );
  }

  addGroup(node: FlatNode): void
  {
    let dialog = this.matDialog.open(InputDialog , {data: {title: 'Group name', yes: 'Save', no: 'Cancel', multipleLine: false}});

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
        {
          let group: Group = {
            name: res,
            path: node.path + '/' + res.toLowerCase(),
            group_users: []
          }
          this.groupService.createGroup(group).pipe(first()).subscribe(
            res => this.updateTree()
          );
        }
      }
    );
  }

  selectFlatNode(node: FlatNode)
  {
    this.selectedGroupID = node.groupID;
  }

  selectGroup(group: Group): void
  {
    this.selectedGroupID = group.id!;
  }

  selectGroupNode(group: GroupNode): void
  {
    this.selectedGroupID = group.groupID;
  }

  getFilterGroups(): GroupNode[]
  {
    if(!this.filter)
      return [];

    let groupNodes: GroupNode[] = [];

    this.dataSource.data.forEach(gn => groupNodes.push(...this.filterGroups(gn)));

    return groupNodes;
  }

  private filterGroups(groupNode: GroupNode): GroupNode[]
  {
    let groupNodes: GroupNode[] = [];

    if(groupNode.name.toLowerCase().includes(this.filter.toLowerCase()))
        groupNodes.push(groupNode);

    if(groupNode.children)
      groupNode.children.forEach(gn => groupNodes.push(...this.filterGroups(gn)));

    return groupNodes;
  }

  getFilterSharedGroup(): Group[]
  {
    return this.relatedGroups.filter(g => g.name.toLowerCase().includes(this.filter.toLowerCase()));
  }
}
