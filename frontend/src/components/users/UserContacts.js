import { useEffect } from "react";

const UserContacts = () => {
  const accessContacts = () => {
    navigator.contacts
      .select(["name", "email", "phone"])
      .then((contacts) => {
        // Handle retrieved contacts
        console.log(contacts);
      })
      .catch((error) => {
        // Error occurred while retrieving contacts, handle accordingly
        console.error(error);
      });
  };
  const handlePermissionDenied = () => {
    // Handle case when permission is denied
    console.log("Contacts permission denied");
  };

  const handleContactsNotSupported = () => {
    // Handle case when Contacts API is not supported
    console.log("Contacts API is not supported");
  };
  useEffect(() => {
    const requestContactsPermission = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "contacts",
        });

        if (permissionStatus.state === "granted") {
          // Permission already granted, proceed to access contacts
          accessContacts();
        } else if (permissionStatus.state === "prompt") {
          // Permission not yet granted, prompt the user
          permissionStatus.onchange = () => {
            if (permissionStatus.state === "granted") {
              // User granted permission, proceed to access contacts
              accessContacts();
            } else {
              // User denied permission, handle accordingly
              handlePermissionDenied();
            }
          };
        } else {
          // User denied permission, handle accordingly
          handlePermissionDenied();
        }
      } catch (error) {
        // Error occurred while checking permission, handle accordingly
        console.error(error);
      }
    };

    if ("contacts" in navigator && "ContactsManager" in window) {
      requestContactsPermission();
    } else {
      // Contacts API not supported, handle accordingly
      handleContactsNotSupported();
    }
  }, []);

  return <div>{/* Display your contact list here */}</div>;
};

export default UserContacts;
