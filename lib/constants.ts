export const REGIONS = {
  metro_vancouver: { name: 'Metro Vancouver', phone: '604-231-7698', trucksActive: 8, nextAvailable: 'May 14, 10:00 AM' },
  fraser_valley: { name: 'Fraser Valley', phone: '604-889-0032', trucksActive: 3, nextAvailable: 'May 14, 2:00 PM' },
  vancouver_island: { name: 'Vancouver Island', phone: '250-555-0199', trucksActive: 2, nextAvailable: 'May 15, 9:00 AM' },
}

export const DAMAGE_TYPES = [
  { id: 'curb_rash', label: 'Curb Rash' },
  { id: 'cosmetic', label: 'Cosmetic' },
  { id: 'gouge', label: 'Gouge' },
  { id: 'bent', label: 'Bent' },
  { id: 'custom_colour', label: 'Custom Colour' },
]

export const WHEEL_SIZES = [16, 17, 18, 19, 20, 21, 22]

export const FINISH_TYPES = [
  { id: 'silver', label: 'OEM Silver' },
  { id: 'black', label: 'OEM Black' },
  { id: 'chrome', label: 'Chrome' },
  { id: 'custom', label: 'Custom Colour' },
  { id: 'polished', label: 'Polished' },
]

export const VEHICLES: Record<string, Record<string, number[]>> = {
  Toyota: { Camry: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], Corolla: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], RAV4: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  BMW: { '3 Series': [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], '5 Series': [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], X5: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  Mercedes: { 'C-Class': [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], 'E-Class': [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], GLE: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  Honda: { Civic: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], Accord: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], 'CR-V': [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  Ford: { 'F-150': [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], Mustang: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], Explorer: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  Audi: { A4: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], Q5: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], A6: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  Lexus: { IS: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], RX: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], ES: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  Tesla: { 'Model 3': [2018,2019,2020,2021,2022,2023,2024,2025], 'Model S': [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], 'Model Y': [2020,2021,2022,2023,2024,2025] },
  Porsche: { '911': [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], Cayenne: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], Macan: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  Subaru: { Outback: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], WRX: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025], Forester: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
}

export const TESTIMONIALS = [
  { id: 1, quote: 'AWR turned around 22 wheels in 48 hours for our year-end sale. Flawless finish, zero callbacks.', author: 'Jason T.', role: 'Pre-Owned Manager', company: 'Destination BMW' },
  { id: 2, quote: 'The mobile service is a game changer. Tech showed up at our lot, no downtime.', author: 'Sarah M.', role: 'Service Director', company: 'Acura On Burrard' },
  { id: 3, quote: 'Net-30 invoicing and priority dispatch makes this the easiest vendor relationship we have.', author: 'Mike R.', role: 'GM', company: 'Ferrari Maserati of Vancouver' },
  { id: 4, quote: 'ICBC certified and Red Seal techs. We trust AWR with every luxury vehicle on our floor.', author: 'Linda K.', role: 'Used Car Director', company: 'OpenRoad Auto Group' },
  { id: 5, quote: 'Our customers never know there was damage. The colour matching is impeccable.', author: 'David C.', role: 'Parts Manager', company: 'Porsche Centre Vancouver' },
  { id: 6, quote: '22 years in business for a reason. Best wheel restoration in BC, period.', author: 'Rachel W.', role: 'Fleet Manager', company: 'Hertz Fleet Solutions' },
]

export const GALLERY_ITEMS = [
  { id: 1, damageType: 'curb_rash', label: 'Curb Rash', wheelInfo: '18" OEM Silver', technique: 'Precision fill & colour match', completionTime: 'Same-day service', before: 'https://placehold.co/600x400/1A1A1A/FF5722?text=BEFORE', after: 'https://placehold.co/600x400/1A1A1A/4CAF50?text=AFTER' },
  { id: 2, damageType: 'cosmetic', label: 'Cosmetic', wheelInfo: '20" Chrome', technique: 'Chrome restoration polish', completionTime: 'Next-day service', before: 'https://placehold.co/600x400/1A1A1A/FF5722?text=BEFORE', after: 'https://placehold.co/600x400/1A1A1A/4CAF50?text=AFTER' },
  { id: 3, damageType: 'curb_rash', label: 'Curb Rash', wheelInfo: '19" OEM Black', technique: 'Sand, prime, paint, clear', completionTime: 'Same-day service', before: 'https://placehold.co/600x400/1A1A1A/FF5722?text=BEFORE', after: 'https://placehold.co/600x400/1A1A1A/4CAF50?text=AFTER' },
  { id: 4, damageType: 'custom', label: 'Custom', wheelInfo: '21" Custom Gloss Black', technique: 'Full strip & custom coat', completionTime: '2-day service', before: 'https://placehold.co/600x400/1A1A1A/FF5722?text=BEFORE', after: 'https://placehold.co/600x400/1A1A1A/4CAF50?text=AFTER' },
  { id: 5, damageType: 'severe', label: 'Severe', wheelInfo: '18" OEM Silver', technique: 'Structural repair + refinish', completionTime: '3-day service', before: 'https://placehold.co/600x400/1A1A1A/FF5722?text=BEFORE', after: 'https://placehold.co/600x400/1A1A1A/4CAF50?text=AFTER' },
  { id: 6, damageType: 'cosmetic', label: 'Cosmetic', wheelInfo: '17" OEM Silver', technique: 'Scuff fill & polish', completionTime: 'Same-day service', before: 'https://placehold.co/600x400/1A1A1A/FF5722?text=BEFORE', after: 'https://placehold.co/600x400/1A1A1A/4CAF50?text=AFTER' },
  { id: 7, damageType: 'curb_rash', label: 'Curb Rash', wheelInfo: '22" OEM Polished', technique: 'Diamond-cut + clear', completionTime: 'Next-day service', before: 'https://placehold.co/600x400/1A1A1A/FF5722?text=BEFORE', after: 'https://placehold.co/600x400/1A1A1A/4CAF50?text=AFTER' },
  { id: 8, damageType: 'custom', label: 'Custom', wheelInfo: '20" Two-tone Custom', technique: 'Custom two-tone finish', completionTime: '2-day service', before: 'https://placehold.co/600x400/1A1A1A/FF5722?text=BEFORE', after: 'https://placehold.co/600x400/1A1A1A/4CAF50?text=AFTER' },
  { id: 9, damageType: 'severe', label: 'Severe', wheelInfo: '19" OEM Black', technique: 'Weld repair + full refinish', completionTime: '3-day service', before: 'https://placehold.co/600x400/1A1A1A/FF5722?text=BEFORE', after: 'https://placehold.co/600x400/1A1A1A/4CAF50?text=AFTER' },
  { id: 10, damageType: 'cosmetic', label: 'Cosmetic', wheelInfo: '18" Chrome', technique: 'Chrome re-plate & polish', completionTime: 'Next-day service', before: 'https://placehold.co/600x400/1A1A1A/FF5722?text=BEFORE', after: 'https://placehold.co/600x400/1A1A1A/4CAF50?text=AFTER' },
  { id: 11, damageType: 'curb_rash', label: 'Curb Rash', wheelInfo: '16" OEM Silver', technique: 'Precision fill & OEM match', completionTime: 'Same-day service', before: 'https://placehold.co/600x400/1A1A1A/FF5722?text=BEFORE', after: 'https://placehold.co/600x400/1A1A1A/4CAF50?text=AFTER' },
  { id: 12, damageType: 'custom', label: 'Custom', wheelInfo: '21" Satin Bronze', technique: 'Powder coat custom finish', completionTime: '2-day service', before: 'https://placehold.co/600x400/1A1A1A/FF5722?text=BEFORE', after: 'https://placehold.co/600x400/1A1A1A/4CAF50?text=AFTER' },
]

export const ADMIN_JOBS = [
  { id: 'AWC-2401', customer: 'Tesla Model S Owner', region: 'metro_vancouver', serviceType: 'mobile', wheels: 4, damage: 'Curb Rash', time: '9:00 AM', status: 'in_progress', tech: 'Mike Johnson', truck: 'AWC-04' },
  { id: 'AWC-2402', customer: 'Destination BMW', region: 'metro_vancouver', serviceType: 'mobile', wheels: 2, damage: 'Cosmetic', time: '11:00 AM', status: 'pending', tech: 'Unassigned', truck: '' },
  { id: 'AWC-2403', customer: 'Porsche Centre Van', region: 'fraser_valley', serviceType: 'shop_dropoff', wheels: 4, damage: 'Custom Colour', time: '10:30 AM', status: 'quality_check', tech: 'Dave Chen', truck: 'AWC-07' },
  { id: 'AWC-2404', customer: 'Sarah M. (Private)', region: 'metro_vancouver', serviceType: 'mobile', wheels: 1, damage: 'Gouge', time: '2:00 PM', status: 'pending', tech: 'Unassigned', truck: '' },
  { id: 'AWC-2405', customer: 'Acura On Burrard', region: 'metro_vancouver', serviceType: 'shop_dropoff', wheels: 3, damage: 'Curb Rash', time: '8:00 AM', status: 'completed', tech: 'Sam Park', truck: 'AWC-02' },
  { id: 'AWC-2406', customer: 'OpenRoad Auto', region: 'fraser_valley', serviceType: 'mobile', wheels: 4, damage: 'Bent + Curb Rash', time: '1:00 PM', status: 'in_progress', tech: 'Tom Willis', truck: 'AWC-09' },
  { id: 'AWC-2407', customer: 'James L. (Private)', region: 'vancouver_island', serviceType: 'mobile', wheels: 2, damage: 'Cosmetic', time: '3:30 PM', status: 'pending', tech: 'Unassigned', truck: '' },
  { id: 'AWC-2408', customer: 'Ferrari Maserati Van', region: 'metro_vancouver', serviceType: 'shop_dropoff', wheels: 4, damage: 'Custom Chrome', time: '9:30 AM', status: 'quality_check', tech: 'Mike Johnson', truck: 'AWC-04' },
  { id: 'AWC-2409', customer: 'Hertz Fleet', region: 'metro_vancouver', serviceType: 'shop_dropoff', wheels: 8, damage: 'Curb Rash (bulk)', time: '7:00 AM', status: 'completed', tech: 'Sam Park', truck: 'AWC-02' },
  { id: 'AWC-2410', customer: 'Emily R. (Private)', region: 'fraser_valley', serviceType: 'mobile', wheels: 1, damage: 'Curb Rash', time: '4:00 PM', status: 'pending', tech: 'Unassigned', truck: '' },
]

export const TRUCKS = [
  { id: 'AWC-02', tech: 'Sam Park', region: 'metro_vancouver', status: 'returning' },
  { id: 'AWC-04', tech: 'Mike Johnson', region: 'metro_vancouver', status: 'on_job' },
  { id: 'AWC-07', tech: 'Dave Chen', region: 'fraser_valley', status: 'on_job' },
  { id: 'AWC-09', tech: 'Tom Willis', region: 'fraser_valley', status: 'en_route' },
  { id: 'AWC-11', tech: 'Jay Malik', region: 'vancouver_island', status: 'available' },
]

export const BASE_PRICE_PER_WHEEL = { minimal: 300, moderate: 400, severe: 500 }
export const WHEEL_SIZE_ADJUSTMENT: Record<number, number> = { 16: 0, 17: 0, 18: 0, 19: 0, 20: 50, 21: 75, 22: 100 }
export const FINISH_ADJUSTMENT: Record<string, number> = { silver: 0, black: 0, chrome: 150, custom: 75, polished: 100 }
export const SERVICE_FEE: Record<string, number> = { metro_vancouver: 50, fraser_valley: 75, vancouver_island: 100, shop_dropoff: 0 }
export const DISCOUNT = { multi_wheel: 0.10, trade_account: 0.15, repeat_customer: 0.05 }
export const GST_RATE = 0.05
export const DEPOSIT_AMOUNT = 50
