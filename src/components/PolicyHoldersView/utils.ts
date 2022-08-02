import { faker } from "@faker-js/faker";
import { TInfoTableRow } from "../InfoTable/InfoTable";
import { PolicyHolder } from "./PolicyHoldersView";

/**
 *  Flat maps an array of policyHolder objects to an array of {key: value} objects
 *  for every key => value pair in each policy holder object
 *  to be used by the InfoTable component.
 *  (address object values are combined into a single string joined with a comma)
 */
export function formatPolicyHolderToTableRows(holders: PolicyHolder[] | undefined): TInfoTableRow[] {
  if (!holders) return [];
  const formattedHolders = holders.flatMap(holder => {
    return Object.entries(holder).map(([key, value]) => ({
      key,
      value: typeof value === 'object' && value !== null ? Object.values(value).join(', ') : value.toString()
    }));
  });
  return formattedHolders;
};

export function generateFakePolicyHolder(): PolicyHolder {
  return {
    name: faker.name.findName(),
    age: parseInt(faker.random.numeric(2)),
    phoneNumber: faker.phone.number(),
    isPrimary: false,
    address: {
      line1: faker.address.streetAddress(true),
      line2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      postalCode: faker.address.zipCode()
    }
  }
}