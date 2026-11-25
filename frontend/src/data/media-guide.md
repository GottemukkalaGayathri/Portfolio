# Local portfolio media

The application does not download project screenshots, certificate images, or fonts from external sites. Add image files manually under `frontend/public/`.

## Project screenshots

Put project screenshots in `frontend/public/projects/`. In `portfolio.js`, set the relevant `image` field to a local public path such as `/projects/my-project.png`. Leave the field empty to show the local fallback tile. Project URLs are links only and open when clicked.

## Certificate scans

Put certificate images in `frontend/public/certificates/`. The `certifications` records in `portfolio.js` already use these local paths:

- `badge.png` - IBM Data Science Badge
- `ibm.png` - IBM Data Science Certificate
- `javascript.jpg` - HTML, CSS, JavaScript Certification
- `react.jpg` - React.js Certification
- `node.jpg` - Node.js & Express.js Certification
- `db.jpg` - SQL & MongoDB Certification
- `flexbox.jpg` - Flexbox
- `os.jpg` - Operating System Certificate
- `python.jpg` - Python Certification
- `responsive.jpg` - Responsive Website Certification
- `static.jpg` - Static Website Certification
- `nxtwave-full-stack.png` - NxtWave Full Stack Development Certification (not uploaded yet)
- `hackerrank-javascript.png` - HackerRank 4-Star JavaScript (not uploaded yet)
- `30-day-coding-challenge.png` - 30-Day Coding Challenge (not uploaded yet)

If a file is not present, the certificate card shows a local placeholder. Add a file with the matching name to show it.
