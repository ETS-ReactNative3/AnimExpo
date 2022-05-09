# AnimExpo
An Anime library for users to explore new Anime 
and create a saving list to track their favorite and watched/unwatched Anime 
(On-going project)

The project topic is to create a mobile application that is similar to a book of Anime, 
which allows users to search and view the detailed information about the Anime they are in-terested in. 
Users can also add their favorite Anime to a list that is saved in their local storage, 
then delete it whenever they want to. 


This application has: 
- A Home page, which shows some top lists of Anime that users may be interested in, 
- A Search page that users can search by Anime name or by genres or by suggested keywords,
- A Personal Page that displays all the saved Anime
- Subpages such as Anime Page displays all details of the Anime, 
- and the Character page displays all details of Anime characters


This project uses React Native as its framework. 

It uses React Navigation to provides navigation features among different pages and sub-pages.
For Navigation feature, 
this project applies Bottom Tab Navigator to create different tabs at the bottom of the screen.
It also uses MaterialCommunityIcons to insert symbol for each tab. 

The first page to display to users is HOME page, 
which used useEffect to render several lists of top Anime for users. 
The whole page is vertically scrolling, but each list is horizontally scrolling.
<img width="320" alt="Screenshot 2022-05-10 at 0 20 02" src="https://user-images.githubusercontent.com/48097736/167500545-74e48ead-f126-46ee-932c-f86f297358b1.png">


The second tab leads SEARCH page, where users can search for Anime by:
- search by name (input text)
- search by genres (click the genres buttons)
- check suggested keywords (click the sugeested buttons)
For this page, the Buttons are from React Native Elements so that their styles can be modified.
<img width="318" alt="Screenshot 2022-05-10 at 0 27 04" src="https://user-images.githubusercontent.com/48097736/167501572-a1e25530-86d2-4dee-aff6-ab4c152a0689.png">


From HOME page, user can check top Anime characters in CHARACTER page.
<img width="319" alt="Screenshot 2022-05-10 at 0 32 20" src="https://user-images.githubusercontent.com/48097736/167502191-e568d159-585b-415f-aa72-261cabcaf932.png">


From HOME page and from SEARCH page, by clicking the Anime box, 
Anime's information and image are displayed in ANIME page.
ANIME page has to use isFocused, so that when users leave a particular Anime page, 
all data from the previous Anime is emptied, 
and the next Anime chosen will be displayed instead. 
ANIME page also has a button name 'save'. When users press this button, 
this Anime's name will be saved to users' MY PAGE by using AsyncStorage. 
<img width="316" alt="Screenshot 2022-05-10 at 0 31 01" src="https://user-images.githubusercontent.com/48097736/167501996-fbfcc409-0293-4908-89da-4258ab287de0.png">


The third tab leads to MY PAGE, where users can see a list of Anime they saved. 
<img width="315" alt="Screenshot 2022-05-10 at 0 35 55" src="https://user-images.githubusercontent.com/48097736/167502578-152a0a91-a57b-4a10-acee-e572150c5fa8.png">



