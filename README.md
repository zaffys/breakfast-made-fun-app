# SunriseFeasts

A visually delightful web app offering a curated collection of family-friendly breakfast ideas with a whimsical, illustrative design.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/zaffys/breakfast-made-fun-app)

SunriseFeasts is a visually captivating web application designed to inspire families with a delightful collection of breakfast recipes. The core of the application is its whimsical and illustrative design, making meal discovery a fun activity for both parents and children. Users can explore recipes through beautifully illustrated categories like 'Quick & Easy', 'Healthy Options', and 'Weekend Treats'. Each recipe is presented on a detailed page with clear ingredients, step-by-step instructions, and a unique illustration. A key feature is the ability for users to 'favorite' recipes, saving them for quick access later. The entire experience is crafted to be intuitive, engaging, and aesthetically pleasing, turning the daily question of 'what's for breakfast?' into an exciting journey.

## Key Features

-   **Whimsical Illustrative Design:** A unique, sketchy, and playful visual style that engages users.
-   **Curated Recipe Categories:** Browse recipes in categories like 'Quick & Easy', 'Healthy Options', and 'Weekend Treats'.
-   **Detailed Recipe View:** Each recipe includes prep time, cook time, ingredients, and step-by-step instructions.
-   **Client-Side Favorites:** Save your favorite recipes for quick access using browser Local Storage.
-   **Responsive Perfection:** A flawless and beautiful experience on any device, from mobile phones to desktops.
-   **Playful Typography:** Uses 'Fredericka the Great' and 'Playfair Display' for a unique and charming feel.

## Technology Stack

-   **Frontend:** React, Vite, React Router
-   **Styling:** Tailwind CSS, shadcn/ui
-   **State Management:** Zustand
-   **Animations:** Framer Motion
-   **Icons:** Lucide React
-   **Backend:** Hono on Cloudflare Workers
-   **Storage:** Cloudflare Durable Objects

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) installed on your machine.
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for Cloudflare deployment.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/sunrise_feasts.git
    cd sunrise_feasts
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

### Running Locally

To start the development server, run the following command:

```sh
bun run dev
```

This will start the Vite development server, typically available at `http://localhost:3000`. The application will automatically reload when you make changes to the source files.

## Usage

Once the application is running, you can:
-   Browse featured recipes on the home page.
-   Click on a category to view a list of related recipes.
-   Select a recipe card to see its detailed instructions and ingredients.
-   Click the heart icon on a recipe detail page to add it to your favorites.
-   Navigate to the "Favorites" page to see all your saved recipes.

## Development

-   **Frontend:** All frontend code is located in the `src/` directory.
    -   Pages are in `src/pages/`.
    -   Reusable components are in `src/components/`.
    -   The Zustand store for favorites is in `src/store/`.
-   **Backend:** Backend logic using Hono is in the `worker/` directory. New API routes can be added in `worker/user-routes.ts`.
-   **Shared Types:** TypeScript types shared between the frontend and backend are in `shared/types.ts`.

## Deployment

This project is configured for easy deployment to Cloudflare Pages.

1.  **Build the project:**
    ```sh
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    Make sure you are logged in to Wrangler, then run:
    ```sh
    bun run deploy
    ```

This command will build the application and deploy it to your Cloudflare account.

Alternatively, you can deploy directly from your GitHub repository.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/zaffys/breakfast-made-fun-app)

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.