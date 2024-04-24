# Haggle

## Overview

Haggle is a web application designed to help users discover and make offers on items for sale. Whether you're looking to sell something you don't need or buy vintage items, Haggle provides an easy-to-use platform for finding the perfect course to fit your needs.

## Haggle Backend

[Haggle-Backend Link](https://github.com/josebarrios23/Haggle-Backend.git)

## Frontend Features

- **Items Listings**: Browse a list of items for sale, including details such as the item photo, seller, description, and price.
- **Search and Filter**: Utilize the search bar and filter functionality to narrow down the list of items based on any desired keywords.
- **User Items View**: Users can view the items they currently have for sale from their account page, and add new items they'd like to sell.
- **Offers**: Make offers for the item directly in the detailed item page, making it easy to place a bid or make an offer. You can also view all offers made for that specific item.
- **Responsive Design**: Enjoy a seamless user experience across various devices and screen sizes, thanks to Haggle's responsive design.

## Frontend Technology Stack

- **Frontend**: Developed using React.js, with functional components and hooks for state management and UI interactions.
- **Styling**: Leveraged Tailwind CSS for styling, ensuring a clean and modern user interface.
- **Routing**: Implemented with React Router for navigation between different views and components.
- **HTTP Requests**: Interacts with the backend API to fetch course data, handle user authentication, and manage user reviews.

## Getting Started Locally

To run Haggle locally on your machine, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. **Clone the repository**

    ```sh
    git clone <repository-url>
    cd haggle
    ```

2. **Install NPM packages**

    ```sh
    npm install
    ```

3. **Set up the Backend**

   Ensure that the backend API is running locally. Refer to the [Haggle Backend](https://github.com/josebarrios23/Haggle-Backend.git) repository for instructions on setting up the backend.

4. **Start the Application**

    ```sh
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## User Stories

**Listing an Item**
As a registered user, I want to list an item for sale so that I can offer it to potential buyers. I can fill out a form with the item's name, description, and price. I can upload a photo of the item to accompany the listing. Once submitted, my item appears on the marketplace with the details provided.

**View Items For Sale**
As a buyer, I want to view a list of all available items so that I can find something I'm interested in purchasing. I can browse a list of items showing name, price, and thumbnail images. I can click on an item to view its detailed page with a full description.

**Add An Offer**
As a buyer, I want to make an offer on an item so that I can buy it at a price I'm willing to pay. On an item's detail page, I can input an amount I'm willing to pay or the item I’m willing to trade, and submit an offer. I can add a message to the seller explaining my offer or asking questions.

**Remove or Edit Items**
As a seller, I want to be able to update item information or delete the item altogether to reflect the current status/price of that item

**Offer Listing**
As a user, I want to view detailed information about other offers on an item, so I can make an appealing counter-offer.

## Stretch Goals

- **Advanced Search Functionality**: Enhance the search functionality with advanced filters, such as sorting by Subject or if the course is free.

- **Tailwind for Styling**: Implement Tailwind CSS for styling the project, ensuring a consistent and modern UI.
