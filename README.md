### Industrial Project 
The purpose for this project is Industrial Consulting Project (QHO635) - Solent University.


### Firebase credentials:
##### Please check - [Google Firebase](https://firebase.google.com/) and create a DB (I have uploaded my DB credentials, not sure if you'll succeed with mines)
& update in Firebase.js file.


###### Please check collections names:
I think for "Manual Import", in code I've put: \
const productRef = doc(db, 'Testing', JSON.parse(Manualimport).id); \
And we need "products", but I've done so only for testing, please ask if something is not clear. 

At the moment I have in my DB next:
- Users collection (done by website running - user orders payed)
- products collection (done by POST API with [project CRUD API run.](https://github.com/rusuot/industrial_project_crud_api_firebase))
- Testing collection (when testing the Manual Import)

![image](https://github.com/rusuot/industrial_project_all/assets/156461904/5aa8ffa5-5bbe-4bc0-951e-7e27af2f9b87)
![image](https://github.com/rusuot/industrial_project_all/assets/156461904/460f92f4-9aa9-44d0-a0c9-26bbfa9203d5)
![image](https://github.com/rusuot/industrial_project_all/assets/156461904/30dac247-0c85-4566-9a53-cbd1d6d38e6a)



(!!!)So, we can work further with "Users" & "products"


### How to run the project:
1. Download zip file
2. Create Firebase DB and get detials needed.
3. I have a hidden file that I was not able to upload on GIT but please check it in image below:

![image](https://github.com/rusuot/industrial_project_all/assets/156461904/ecd8430b-4d03-4958-a309-5330ee016fb2)


Start project with: 
<ul>
<li>npm install</li>
<li>npm start</li>
</ul>

### Few things for a high-level arhitecture
1. We read list of products from a fake API, very similar with Amazon API, and the contents are real.
2. We can insert in Firebase DB with website project via "Manual Import" or with [project CRUD API run.](https://github.com/rusuot/industrial_project_crud_api_firebase).
3. Once a user pay an order, the order data is saved into DB


### Small Notes:
1. Currently Amazon API used is in fact a fake API, which simulates the JSONs from Amazon. \
Fetch calls this fakeapi, and read the data from there.
2. A fake API server can be easily done with (using https://mocki.io/fake-json-api ) also.
3. JSONs files for real products can be checked by using website scrapper, available at: https://github.com/rusuot/industrial_project_amzn_web_scrapper
4. In order to understand CRUD API Firebase, please check: https://github.com/rusuot/industrial_project_crud_api_firebase
   

   
### Observations:
The DOC for Industrail project says next:
Essential Functionalities:
###### 1. Bulk Import: Enable users to import products in bulk from Amazon and eBay using specified filters.
---> This works with 1 product for manual import.
   I have added a button "Manual Import", in which you can insert a JSON file contaning details for one product. This will save the data in DB.
   However, when the list of products electronis category for instance, I did not succeed to read from db as well and append to fetch call from API.
   (see: https://github.com/rusuot/industrial_project_all/blob/5a72e2150f10d96b1d746d463185d0fce48d1647/src/Components/Category/Electronics.js#L100) \
###### 2. Continuous  Availability   Checks:   Implement   automated   checks   to   ensure   product availability is updated regularly, ideally every minute.
---> Not done, not having any idea at the moment how to do it, if somebody wants to take a look, please do so.
###### 3. Automated   Removal:   Remove   unavailable   or   sold-out   products   automatically, displaying a banner message before deletion.
---> Not done, same as 3.
###### 4. Manual Import: Allow users to manually import individual products outside the bulk import process.
So this is done, considering point 1.
###### 5.Scalability:   Design   the   platform   to   be   scalable,   accommodating   products   from additional companies or partners.6. User   Interface:   Develop   an   intuitive   and   user-friendly   interface   for   seamless navigation and interaction
---> In here I think we are fine.

!!! Firebase hosting is not yet done, but we will do it, once the project is in final version (if you'll agree with this, of course).

### Notes:
In order to use directly API AMAZON, I think we need to be very experienced developers, and we are students only, in the final year.
My proposal with all this work simulate very well the API Amazon, the website is completly functional (any improvements are more than welcomed), and we have the Manual Import. 
For bulk maybe is just a small think to be done, not sure if I'll have time for it.







