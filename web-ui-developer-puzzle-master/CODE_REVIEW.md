Code Review for OkReads App.

I have done a thorough code examination and have highlighted my findings in the following points.

1. The webapp is working fine with no errors or warnings in the console as for now.
2. The code is precise and to the point, the readability is also good.
3. For a new Developer I found some areas confusing in the code architecture. We can add comments for much better readability in this app.
4. I have run Lint and everything seems fine there with no issue.
5. Some test cases are failing so we can have a look into that also.(I solved the failing test cases)
6. In the code I could not find any way to empty are reset our store. Since we dont have a login/logout functionality so its not that much necessary but i faced some issues while developing the code due to unavailability of this feature.


I have installed LightHouse Extension in my browser and got some accessibility issues in the scan.
They are listed below.

1. Buttons do not have accessible names. (This one is already fixed because we are providing a       placeholder in the input field which suggests user to search)
2. Background and foreground colors do not have a sufficient contrast ratio. (Fixed this issue by changing the shade of the textcolor.)


I have solved the above accessibilty issues and have mentioned some issues below that were not detected by the Lighthouse Scan and were found and have been fixed by me.

1. The font size in the Reading list Sidebar is a little bit low and may cause visibility issues to the users. 
2. In the reading list sometimes if the books name is big compared to the space provided in the sidebar, the user wont be abe to see the full name of the book. So i added a tooltip and the user can hover above it and check the full name of the book.