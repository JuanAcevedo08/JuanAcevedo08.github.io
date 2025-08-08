# Web Portfolio

This is a modern and responsive web portfolio designed to showcase projects, professional history, and contact information. The portfolio is structured to be highly customizable and easy to navigate, making it an ideal tool for impressing managers and recruiters.

## Project Structure

The project is organized into the following directories and files:

- **index.html**: The main entry point for the portfolio.
- **pages/**: Contains additional pages for "About", "Projects", and "Contact".
  - **about.html**: Introduction and professional history.
  - **projects.html**: Displays project cards dynamically generated from data.
  - **contact.html**: Contact section with a LinkedIn profile link.
- **components/**: Reusable components for the portfolio.
  - **header.html**: Navigation links for smooth scrolling.
  - **footer.html**: Social media links and copyright information.
  - **hero.html**: Hero section with a profile image placeholder and contact button.
  - **project-card.html**: Structure for individual project cards.
  - **contact-form.html**: Reserved for a contact form.
  - **testimonial-card.html**: Structure for testimonial cards.
- **assets/**: Contains all assets including CSS, JavaScript, fonts, images, and icons.
  - **css/**: Stylesheets for the portfolio.
  - **js/**: JavaScript files for functionality.
- **data/**: JSON files containing project and testimonial data.
- **sitemap.xml**: Sitemap for search engines.
- **robots.txt**: Instructions for search engines.
- **.gitignore**: Specifies files to ignore in version control.
- **README.md**: Documentation for the project.

## Features

- **Responsive Design**: The portfolio is designed to look great on all devices.
- **Dynamic Content**: Projects and testimonials are loaded dynamically from JSON files.
- **Theme Switching**: Users can switch between light and dark themes.
- **Smooth Scrolling**: Navigation links provide a smooth scrolling experience.
- **Customizable**: CSS variables allow for easy customization of colors and fonts.

## Setup Instructions

1. Clone the repository to your local machine.
2. Open the `index.html` file in your web browser to view the portfolio.
3. Customize the content in the `data/projects.json` and `data/testimonials.json` files to showcase your own projects and testimonials.
4. Modify the CSS files in the `assets/css/` directory to change the appearance of the portfolio as desired.

## License

This project is open-source and available for anyone to use and modify.