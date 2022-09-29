
export interface Group 
{
    id?:          number;
    name:        string;
    path:        string;
    group_users: GroupUser[];
}

export interface GroupUser 
{
    id?:        number;
    group_id:  number;
    user_id:   number;
    authority: string;
    username?: string;
}

export interface GroupNode 
{
  name: string;
  path: string;
  groupID: number;
  children?: GroupNode[];
}

export interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  path: string;
  groupID: number;
}
