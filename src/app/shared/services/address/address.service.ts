import { Injectable } from '@angular/core';
import { ADDRESS } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  readonly ADDRESS = ADDRESS;

  constructor() {}

  searchAddress(key: string, limit: number = 50) {
    const filteredAddresses = ADDRESS.filter(address => address.text.includes(key));
    return filteredAddresses.slice(0, limit);
  }
}
