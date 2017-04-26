var client;
$(function()
{
  //authenticating dropbox
  client = new Dropbox.Client({key: 'lbuxjc4cdhqdyy4'});
  client.authenticate({interactive: false}, function(error)
  {
            if (error)
            {
                alert('Authentication error: ' + error);
            }
  });
      if (client.isAuthenticated())
      {
        //hiding unwanted parts at this point
        $('#login').hide();
        //$('#textarea1').hide();
        $('#listdir').hide();
        //$('#save').hide();
        $('#save2').hide();
        //$('#cancel').hide();
        $('#editHeader').hide();
        $('#textarea2').hide();
        $('#textarea1').show();
        $('#textareaviewnote').hide();
        $('#selectedit').hide();
        $('#selectview').hide();
        $('#viewHeader').hide();
        $('#preauthdesc').hide();

        //the following code just allows the user to add a note as soon
        // they go onto the home page
        $('#save').click(function()
        {
          // prompts the user for a filename after press save
          var filename = prompt("Enter a filename?");
          // this if statement just makes sure if the user pressing cancel in
          // the prompt dialog box it just returns
          if(filename === "")
          {
            alert("Filename can't be empty");

          }
          else if(filename)
          {
            //code to try and stop people using the same file name, i'm not sure how to do this
            /*client.readdir("/", function(error, entries)
            {
              if (error)
              {
                console.log(error);  // Something went wrong.
                return;
              }
              // this will create an dialog box with a list of files
              var filelist = (entries);
              });
              if(filelist.match(/filename.*//*))
              {
                alert("filename is unavailable");


              }
              else
              {
              */
              // takes the string from the textarea and saves that to dropbox under the filename entered by the user
              client.writeFile(filename + ".txt",$('#textarea1').val(), function(error)
              {
                if (error)
                {
                  //alert("Filename might already exist, Try a different name");
                  // NOT TESTED alert(error);
                  console.log(error);  // Something went wrong.
                  return;
                }
                alert(filename + ".txt has been saved to your DropBox");
              });
        // reset the textarea to empty
        $('#textarea1').val('');
        }
        //bracket for the commented out valadition for same file name}
        else
        {
          return;
        }
      });

        // we can probably get rid of this button as i have displayed the current files after you press
        // the edit a file button.
        //i was thinking we could have he textarea wth the file list in at on the left side of the page alongside
        $('#viewnotes').click(function ()
        {

          $('#listdir').show();
          $('#textareaviewnote').show();
          $('#selectview').show();
          $('#viewHeader').show();
          $('#selectedit').hide();
          $('#editHeader').hide();
          $('#addHeader').hide();
          $('#save').hide();
          $('#cancel').hide();
          $('#textarea1').hide();
          $('#textarea2').hide();
          $('#loggedin').hide();

          client.readdir("/", function(error, entries)
          {
            if (error)
            {
              console.log(error);  // Something went wrong.
              return;
            }
            // this adds the list of files into the listdir textarea, this is the
            //only way i found to have them load on a seperate line
            $('#listdir').val("CURRENT FILES: \n" + entries.join("\n"));
          });
          var viewfiletemp = "";
          $('#selectview').click(function()
          {


          // asks the user which file they would like to edit, again this is not ideal as
          // it isn't user friendly but i couldn't find another way to do this
          var viewfile = prompt("Enter a filename to View?");
          // makes sure that the user is return without any issues when the press
          // cancel on the dialog box
          if(viewfile === "")
          {
            alert("Filename can't be empty");
            return;


          }
          else if(viewfile)
          {

          // read the file using the name the user has given, we don't have
          // any validation here need to add
          // i have found some code which shows a progress bar when you upload a file
          // we could add that
          client.readFile(viewfile + ".txt", function(error, filedata)
          {
            if (error)
            {
              // we could keep in this error validation or just write are own
              //saying to check that the file they are trying to edit exist
              //alert("Filename could be incorrect, Try again");
              console.log(error);  // Something went wrong.
              return;
            }


            viewfiletemp = filedata;
            // loads the chosen file into the text area where it can be edited
            $('#textareaviewnote').val("" + viewfiletemp);
          });
          }
          else
          {
              return;
          }

          /*client.readdir("/", function(error, entries)
          {
            if (error)
            {
              console.log(error);  // Something went wrong.
              return;
            }
            // this will create an dialog box with a list of files
            alert("Your Dropbox contains: \n" + entries.join("\n "));

          });*/
        });
      });
        // shows that the user is authenticated
        // can easily put this as a heading on some part of the webpage instead of the
        // dialog box popping up when you go to the home page
        client.getAccountInfo(function(error, accountInfo)
        {
        if (error) {
          return showError(error);  // Something went wrong.
        }
        //alert("Hello, " + accountInfo.name + "!");
        $('#loggedin').append("Hello, " + accountInfo.name + "!<br>You are now connected to your Dropbox account.<br> Start creating your notes.");
        });

        // adding a new note to dropbox
        $('#newnote').click(function()
        {
          // shows the parts we need to achieve this
          $('#textarea1').show();
          $('#save').show();
          $('#cancel').show();
          $('#save2').hide();
          $('#listdir').hide();
          $('#addHeader').show();
          $('#editHeader').hide();
          $('#textarea2').hide();
          $('#loggedin').hide();
          $('#selectedit').hide();
          $('#selectview').hide();
          $('#textareaviewnote').hide();
          $('#viewHeader').hide();


        /*$('#save').click(function()
        {
          // prompts the user for a filename after press save
          var filename = prompt("Enter a filename?");
          // this if statement just makes sure if the user pressing cancel in
          // the prompt dialog box it just returns
          if(filename === "")
          {
            alert("Filename can't be empty");


          }
          else if(filename)
          {

          // takes the string from the textarea and saves that to dropbox under the filename entered by the user
          client.writeFile(filename + ".txt",$('#textarea1').val(), function(error)
          {
            if (error)
            {
              alert("Filename might already exist, Try a different name");
              // NOT TESTED alert(error);
              console.log(error);  // Something went wrong.
              return;
            }
            alert(filename + ".txt has been saved to your DropBox");

          });
        // reset the textarea to empty
        $('#textarea1').val('');
        }
        else
        {
          return;
        }
      });*/
        });
        // edit notes code
        // this var is used to load the current string from a file on dropbox
        var filedatatemp = "";
        $('#editnotes').click(function()
        {
          // shows the parts we need
          $('#listdir').show();
          $('#textarea2').show();
          $('#save').hide();
          $('#save2').show();
          $('#addHeader').hide();
          $('#editHeader').show();
          $('#textarea1').hide();
          //$('#cancel').show();
          $('#loggedin').hide();

          $('#selectedit').show();
          $('#selectview').hide();
          $('#viewHeader').hide();
          $('#textareaviewnote').hide();
          // reads in all files from the folder our app has access to on dropbox
          client.readdir("/", function(error, entries)
          {
            if (error)
            {
              console.log(error);  // Something went wrong.
              return;
            }
            // this adds the list of files into the listdir textarea, this is the
            //only way i found to have them load on a seperate line
            $('#listdir').val("CURRENT FILES: \n" + entries.join("\n"));
          });

          $('#selectedit').click(function()
          {


          // asks the user which file they would like to edit, again this is not ideal as
          // it isn't user friendly but i couldn't find another way to do this
          var editfile = prompt("Enter a filename to Edit?");
          // makes sure that the user is return without any issues when the press
          // cancel on the dialog box
          if(editfile === "")
          {
            alert("Filename can't be empty");
            return;
          }
          else if(editfile)
          {

          // read the file using the name the user has given, we don't have
          // any validation here need to add
          // i have found some code which shows a progress bar when you upload a file
          // we could add that
          client.readFile(editfile + ".txt", function(error, filedata)
          {
            if (error)
            {
              // we could keep in this error validation or just write are own
              //saying to check that the file they are trying to edit exist

              alert("Filename could be incorrect, Try again");
              console.log(error);  // Something went wrong.
            }

            filedatatemp = filedata;
            // loads the chosen file into the text area where it can be edited
            $('#textarea2').val("" + filedatatemp);

            $('#save2').click(function()
            {
              //uploads the new editing textarea to the same file name
              client.writeFile(editfile + ".txt",$('#textarea2').val(), function(error)
              {
                if (error)
                {
                  // need to add validation in here
                  console.log(error);
                  //return;
                }
                alert(editfile + ".txt has been edited and saved to Dropbox");
              });
            // emptying the textarea and hiding the second save button as
            $('#textarea2').val('');
            });

          });
          }
          else
          {
              return;
          }
        });
        });
        }
        else
        {
          $('#textarea1').hide();
          $('#save').hide();
          $('#cancel').hide();
          $('#save2').hide();
          $('#listdir').hide();
          $('#addHeader').hide();
          $('#editHeader').hide();
          $('#textarea2').hide();
          $('#loggedin').hide();
          $('#selectedit').hide();
          $('#selectview').hide();
          $('#textareaviewnote').hide();
          $('#viewHeader').hide();
          $('#viewnotes').hide();
          $('#newnote').hide();
          $('#editnotes').hide();
        // show the Sign into Dropbox button
        var button = document.querySelector("#login");
        button.setAttribute("class", "visible");
        button.addEventListener("click", function()
        {
          // The user will have to click an 'Authorize' button.
          client.authenticate(function(error, client)
          {
            if (error)
            {
              return handleError(error);
            }
          });
        });
      }
});
