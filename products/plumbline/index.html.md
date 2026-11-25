# Plumbline by Ideator Labs

> Plumbline is operations software for QSR and café chains of 10 to 100 outlets in India. Audits, stock counts, cash-ups, supply orders, licence renewals, crew training and guest complaints each live in their own module, on one sign-in. Whatever goes wrong at an outlet becomes an item with an owner, a deadline and proof, and anything late goes to the area manager and then head office without anyone chasing it.

- Sector: QSR and café chains
- Made by: Ideator Labs, a studio for AI and data advisory, innovation and business intelligence (https://ideatorlabs.github.io/)
- Page: https://ideatorlabs.github.io/products/plumbline/
- Articles: https://ideatorlabs.github.io/blog/plumbline/
- Demo: https://ideatorlabs.github.io/contact/?topic=plumbline

## Who it is for: Chains with outlets to keep in line

- QSR, café and cloud-kitchen chains of 10 to 100 outlets, company-owned or franchised
- Founders and operations heads who see each outlet only through calls and spreadsheets
- Area managers, store managers and crew, on their phones

## The problem: Money and standards slip between outlets

- Closing stock, wastage and cash are counted on paper or in WhatsApp, so a gap shows up weeks later, if at all.
- Audit findings, short supplies and licence renewals sit in different sheets, and the area manager chases each one by phone.
- In one Mumbai case, 18 of 20 critical items from an earlier improvement notice were still open when the outlet’s licence was suspended.

## How Plumbline works

1. **Audits and fixes.** Checks on the phone, offline if needed. A failed item becomes a fix with an owner, a deadline by severity and photo proof, verified by someone else.
2. **Stock and variance.** Recipes, closing counts, wastage with a photo and purchases. Each outlet's day is costed against its sales, and a variance over the limit needs an explanation.
3. **Cash and settlements.** Shift cash-ups by denomination, deposits with the slip, and UPI and card settlements matched to the POS. Every difference gets an owner.
4. **Supply, licences and training.** Indents against a published rate card with short-supply claims; a licence register with renewal reminders; station sign-off for new crew.
5. **Guests and head office.** A QR form at each outlet turns complaints into items for the outlet. Head office sees one review queue, a risk ranking and the rupees measured.

## How your data is handled

Each chain’s checks, photos and fixes are stored in its own account, and every page and query is limited to that chain and to the locations each person works in. Photos come only from the in-app camera and are fingerprinted (SHA-256) on the phone when taken, with the phone’s and the server’s time. Every step on a finding is kept in an append-only, hash-chained record that head office can export as an evidence pack. Nothing is deleted, and no data is sent to outside AI services.

## Around the product

- Advisory: custom AI, data and reporting work around Plumbline, such as joining it with Tally, an ERP or other systems. Free 25-minute call, then a fixed-fee diagnostic: https://ideatorlabs.github.io/solutions/
- Related product: Chairside by Ideator Labs. For salon and spa chains: package uses confirmed by the client, a due-back list for the desk, commission from checked services, and a morning summary per outlet. https://ideatorlabs.github.io/products/chairside/
