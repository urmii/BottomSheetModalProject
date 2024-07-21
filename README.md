# Bottom Sheet Modal Project

This project demonstrates the implementation of a bottom sheet modal in a React Native application using TypeScript.
The modal allows users to enter and save keynotes, which are then displayed on the main screen. 
The modal is designed to handle keyboard visibility appropriately.

## Instructions

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-repo/bottom-sheet-modal.git
cd bottom-sheet-modal
```
2. **Install dependencies**
```bash
npm install
```
3. **Run the project**
   
    **For iOS:**
    ```bash
    npx pod-install
    npm run ios
    ```

    **For Android:**
    ```bash
    npm run android
    ```

### Running the Project

1. **Open the Bottom Sheet**
Tap the "Add Keynote" button at the bottom of the screen to open the bottom sheet modal.

2. **Add a Keynote**
Enter your text in the input field inside the modal.
Tap the "Save" button to save the keynote. The modal will close and the keynote will be displayed on the main screen.

3. **Clear All Keynotes**
Tap the "Clear All" button to remove all keynotes from the list.

## Approach and Design Decisions

### Modal Design
1. **Bottom Sheet Modal:** The bottom sheet modal slides up from the bottom of the screen and includes a text input field and submit button.

2. **Text Input Field**: Allows users to enter keynotes.

3. **Submit Button:** Saves the entered keynote and closes the modal.

4. **Open/Close Button:** A button on the main screen controls the opening and closing of the modal.

### State Management
1. **useState Hook:** Used to manage the text entered by the user and the list of submitted keynotes.

2. **showClearButton State:** Tracks whether the "Clear All" button should be displayed based on the presence of keynotes.

### Keyboard Handling
1. **KeyboardAvoidingView:** Ensures the modal is not blocked by the keyboard when it is open, particularly on iOS.

2. **Keyboard Listeners:** Adjust the modal height dynamically based on keyboard visibility to maintain alignment with the keyboard.

## Assumptions
1. **Basic Validation:** The input text must not be empty when saving a keynote.
2. **User Interaction:** The modal will close upon successful submission or cancellation.
3. **Email Contact**: A link is provided to contact support via email for suggestions or issues.

   
   

  

