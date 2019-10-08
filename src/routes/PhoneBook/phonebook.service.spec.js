/* eslint sort-keys: 0 */
/* eslint no-useless-escape: 0 */
import { MAX_ENTRIES } from '@/routes/PhoneBook/phonebook.config'

import { getPhoneBookEntries } from '@/api/phonebook.dataservice'
import { getEntries } from '@/routes/PhoneBook/phonebook.service'

jest.mock('@/api/phonebook.dataservice', () => ({
  getPhoneBookEntries: jest.fn()
}))

describe('phonebook.service', () => {
  describe('getEntries', () => {
    it('should correctly transform data for component', async () => {
      const response = [
        {
          name: 'Εφιάλτης',
          surname: 'Αθανασίου',
          gender: 'male',
          region: 'Greece',
          age: 29,
          title: 'mr',
          phone: '(683) 900 1566',
          birthday: {
            dmy: '08\/04\/1990',
            mdy: '04\/08\/1990',
            raw: 639616463
          },
          email: 'Εφιάλτης90@example.com',
          password: 'Αθανασίου90~}',
          credit_card: {
            expiration: '2\/27',
            number: '6086-6077-7909-6535',
            pin: 5197,
            security: 573
          },
          photo: 'https:\/\/uinames.com\/api\/photos\/male\/12.jpg'
        },
        {
          name: 'Tatiana',
          surname: 'Anghelescu',
          gender: 'female',
          region: 'Romania',
          age: 22,
          title: 'ms',
          phone: '(674) 954 2573',
          birthday: {
            dmy: '29\/08\/1997',
            mdy: '08\/29\/1997',
            raw: 872900398
          },
          email: 'tatiana97@example.com',
          password: 'Anghelescu97=$',
          credit_card: {
            expiration: '5\/21',
            number: '8384-3030-4144-7091',
            pin: 3914,
            security: 664
          },
          photo: 'https:\/\/uinames.com\/api\/photos\/female\/13.jpg'
        },
        {
          name: 'Margita',
          surname: 'Hrušovský',
          gender: 'female',
          region: 'Slovakia',
          age: 27,
          title: 'mrs',
          phone: '(797) 402 9940',
          birthday: {
            dmy: '18\/09\/1992',
            mdy: '09\/18\/1992',
            raw: 716847817
          },
          email: 'margita92@example.com',
          password: 'Hrušovský92+}',
          credit_card: {
            expiration: '6\/23',
            number: '5848-7427-9988-5083',
            pin: 8596,
            security: 600
          },
          photo: 'https:\/\/uinames.com\/api\/photos\/female\/10.jpg'
        },
        {
          name: 'Εύηνος',
          surname: 'Λαγός',
          gender: 'male',
          region: 'Greece',
          age: 24,
          title: 'mr',
          phone: '(340) 705 4358',
          birthday: {
            dmy: '16\/01\/1995',
            mdy: '01\/16\/1995',
            raw: 790299922
          },
          email: 'Εύηνος_95@example.com',
          password: 'Λαγός95#',
          credit_card: {
            expiration: '5\/21',
            number: '2554-4105-3063-8132',
            pin: 2116,
            security: 553
          },
          photo: 'https:\/\/uinames.com\/api\/photos\/male\/17.jpg'
        }
      ]
      getPhoneBookEntries.mockImplementationOnce(() => Promise.resolve(response))
      const processed = await getEntries({ amount: MAX_ENTRIES })
      expect(processed).toEqual([
        { name: 'Εφιάλτης', surname: 'Αθανασίου', phone: '(683) 900 1566', email: 'Εφιάλτης90@example.com', gender: 'male', id: 1 },
        { name: 'Tatiana', surname: 'Anghelescu', phone: '(674) 954 2573', email: 'tatiana97@example.com', gender: 'female', id: 2 },
        { name: 'Margita', surname: 'Hrušovský', phone: '(797) 402 9940', email: 'margita92@example.com', gender: 'female', id: 3 },
        { name: 'Εύηνος', surname: 'Λαγός', phone: '(340) 705 4358', email: 'Εύηνος_95@example.com', gender: 'male', id: 4 }
      ])
    })
  })
})
