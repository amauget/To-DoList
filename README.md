# To-DoList
This project emphasized heavily on the principles of data retrieval, manipulation, nesting, and sorting.
That is why the presentation is not as crisp as other projects. 

Added projects append to the sidebar and are sorted by due date: from closest to furthest out.

Added projects require a name and due date. If these aren't provided, the missing input will gain a red border.

A duplicate project name may not be added, and attempting to do so will cause a popup to alert you to the issue, 
and the project form name input will reset to empty after pressing okay.

Clicking on a sidebar project will populate a header with all of the project's pertinent info, and add a 
container for tasks that may be added to the specific project. 

In addition, each project is provided with an "edit project" button, and a "delete project" button.

Edit Project: 
	Converts the header into an input overlay. Each project header, while mostly still in the same location,
	is subject to edit.

	buttons: "edit project" & "delete project" -> "submit changes" & "discard changes"

Once a task is added (comment is optional) it is appended with its name, due date, comment, edit button, and 
a delete button. 

Tasks may be repeated, so if a task is added, or an existing task name is changed to that of an existing task, 
a window will present, asking if the user would like to duplicate the task, or cancel.

Tasks also sort based on due date. 

Adding, editing and deleting tasks/projects are updated in realtime.


Closing notes:

	If I had more time, I would like to add a mark complete function,
	as well as a complete container for completed tasks to be appended to. 
	Of course this would also need to be reversable, and with limited time seemed like diminishing returns.
	
	While the function of this project is nice for my level of experience, I am really disappointed 
	in the architecture of function/file layout and how they intermingle. Going forward, I will be writing
	out absolutely every process that I can consider for a project before typing a single line of code.

	The importance of identifying duplicates BEFORE writing an associated function/class can't be understated
	to prevent refactoring. 




SOURCES:

Gear Icon:
	https://www.svgrepo.com/svg/509956/gear

Trash Icon: 
	https://www.svgrepo.com/svg/533007/trash	