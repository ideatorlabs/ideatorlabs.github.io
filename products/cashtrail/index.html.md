# Cashtrail by Ideator Labs

> Cashtrail runs the statement review for each loan application as a case. It reads the statements, checks every balance, looks for signs a PDF was edited and turns what needs a look into flags. An analyst clears each flag with a note, a second person signs the case off, and the loan system receives it with a PDF report.

- Sector: Finance
- Made by: Ideator Labs, a studio for AI and data advisory, innovation and business intelligence (https://ideatorlabs.github.io/)
- Page: https://ideatorlabs.github.io/products/cashtrail/
- Articles: https://ideatorlabs.github.io/blog/cashtrail/
- Demo: https://ideatorlabs.github.io/contact/?topic=cashtrail

## Who it is for: Credit teams that review statements

- Small NBFCs underwriting MSME and personal loans
- Credit analysts and credit managers
- DSA teams preparing files for lenders

## The problem: Statement review is slow and hard to check

- Analysts retype statements into spreadsheets before they can judge them.
- Edited PDFs and money moved in circles are easy to miss.
- Who checked what, and who approved it, is spread across WhatsApp and email.

## How Cashtrail works

1. **Open a case.** One case per application, opened in Cashtrail or by the loan system through the API, with the statements attached.
2. **Checks run.** Every balance is checked to the paisa, each PDF is checked for signs of editing, and red flags are raised with the rows behind them.
3. **Clear each flag.** The analyst explains or confirms each flag with a note. Only a credit manager can explain away a serious one.
4. **Second sign-off.** A credit manager signs the case off or sends it back. The person who sent it for sign-off cannot sign it.
5. **Send and track.** The signed-off case and its PDF report go to the loan system. Cases past the sign-off target are escalated.

## How your data is handled

Each lender's cases are kept in its own account, visible only to its team and its API keys. Uploaded files are not stored: a case keeps the rows read and each file's fingerprint, and the rows are wiped a set number of days after the case closes. Every step is written to a tamper-evident log. Statement contents are never sent to any other service, and Cashtrail never scores a borrower or makes the lending decision.

## Around the product

- Advisory: custom AI, data and reporting work around Cashtrail, such as joining it with Tally, an ERP or other systems. Free 25-minute call, then a fixed-fee diagnostic: https://ideatorlabs.github.io/solutions/
- Related product: Docketbox by Ideator Labs. Compliance task tracker for CA firms: a task per client, return and period, statutory due dates, papers by link, partner approval, filing proof and escalation. https://ideatorlabs.github.io/products/docketbox/
