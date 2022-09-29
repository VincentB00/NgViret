export interface Item 
{
    id:               number;
    name:             string;
    username:         string;
    password:         string;
    authenticatorKey: string;
    url:              string;
    note:             string;
    group_id:         number;
    publicKey?:       string;
    itemStorages:     ItemStorage[];
}

export interface ItemStorage 
{
    id?:     number;
    item_id: number;
    name:    string;
    value:   string;
}
