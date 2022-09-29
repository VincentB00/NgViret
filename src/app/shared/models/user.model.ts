export interface User 
{
    id?:                    number;
    username:               string;
    password:               string;
    email:                  string;
    accountNonExpired?:     boolean;
    accountNonLocked?:      boolean;
    credentialsNonExpired?: boolean;
    enabled?:               boolean;
    userRoles?:             UserRole[];
    publicKey?:             string;
}

export interface UserRole 
{
    id?:        number;
    authority:  string;
}

export interface Response 
{
    success: boolean;
    status:  number;
    message: string;
}

export interface UserTable
{
    id?:                   number;
    username:              string;
    password:              string;
    email:                 string;
    accountNonExpired:     boolean;
    accountNonLocked:      boolean;
    credentialsNonExpired: boolean;
    enabled:               boolean;
    userRoles:             string;
}
