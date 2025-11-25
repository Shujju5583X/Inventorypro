# InventoryPro Walkthrough

I have successfully set up the InventoryPro application with a monorepo structure.

## Structure

-   **Root**: Contains `package.json` with `concurrently` to run both servers.
-   **Server**: Node.js/Express backend with MySQL/Sequelize.
    -   Models: `User`, `Item`
    -   Auth: JWT based
    -   API: `/api/auth`, `/api/items`
-   **Client**: React (Vite) frontend with Tailwind CSS.
    -   Context: `AuthContext` for state management.
    -   Components: `Login`, `Dashboard`, `ItemModal`.

## Verification

To verify the application:

1.  Ensure MySQL is running and `inventory_db` exists.
2.  Run `npm run dev` in the root directory.
3.  Open `http://localhost:5173` in your browser.
4.  Register a new user.
5.  Login.
6.  Add items to the inventory.
7.  Check the dashboard stats.

## Next Steps

-   Implement more granular error handling.
-   Add unit tests.
-   Deploy to a hosting provider.
