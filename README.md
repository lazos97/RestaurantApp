# RestaurantApplication

Application Setup & Execution Guide Follow the steps below to install and run the Restaurant App, which consists of two parts: Front-End (restaurant) and Back-End (restaurant-server).

Update the IP Address Before starting the application, you need to configure the correct local IP address to enable proper communication between the front end and the back end:

1. Open Command Prompt and run the following command to find your local IP address: ipconfig
2. Locate and open the file: restaurant/utils/index.ts

3. Find the following line: export const APP_URL = "YOUR_IP"; Replace "YOUR_IP" with your actual local IP address (e.g., 192.168.1.100).

4. Open the Project in Visual Studio Code or any code editor Launch Visual Studio Code. Open the root folder that contains both restaurant and restaurant-server directories.

5. Install Dependencies You will need two terminals to install dependencies for both the front end and back end:

   Go to Terminal > New Terminal. Click Split Terminal to open a second terminal side by side. Then, in each terminal run the following commands:

   First Terminal (Back-End): cd ./restaurant-server npm i

   Second Terminal (Front-End): cd ./restaurant npm i

   Start the Application Once dependencies are installed and the IP is set:

   Start the Back-End: cd ./restaurant-server npm start

   Start the Front-End: cd ./restaurant npm start

   That’s it! The application should now be up and running. Open your browser and enjoy using the Restaurant App!
