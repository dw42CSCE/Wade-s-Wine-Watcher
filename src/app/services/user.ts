import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected users:User[] =
  [
    { id: 1, username: 'user1', email: 'test@gmail.com', password: 'password1' },
  ]

  private user: User | null = null;

  public getUser(): User | null {
    console.log('getUser called');
    console.log('Current user:', this.user);
    return this.user;
  }



login(username: string, password: string): boolean {
  const foundUser = this.users.find(u => u.username === username && u.password === password);
  this.user = foundUser || null;
  console.log('login called with', username, password, 'foundUser:', foundUser);
  return !!foundUser;
}

  constructor() {
    console.log('UserService instance created');
  }

}
