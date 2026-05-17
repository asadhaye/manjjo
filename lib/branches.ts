// Branch configuration for Manjjo

export interface Branch {
  id: string
  name: string
  address: string
  area: string
  photo?: string
}

export const BRANCHES: Branch[] = [
  {
    id: 'pchs',
    name: 'PCHS Branch',
    address: '9C Commercial, Punjab Cooperative Housing Society, Phase 4, DHA Lahore',
    area: 'PCHS',
    photo: '/images/pchs.jpeg'
  },
  {
    id: 'garden-town',
    name: 'Garden Town Branch',
    address: 'Hascol Petrol Station, 18 Abu Bakar Block, Garden Town, Lahore',
    area: 'Garden Town'
  }
]

export function getBranchById(id: string): Branch | undefined {
  return BRANCHES.find(branch => branch.id === id)
}
