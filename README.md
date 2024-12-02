## NaviBuilder

### **Project Description**

`NaviBuilder` is a web application built using the **Next.js** framework, designed for creating and editing navigation lists. The project follows a design provided in Figma and utilizes technologies such as **Tailwind CSS**, **dnd-kit** (for drag-and-drop functionality), and **React Hook Form** (for form handling and validation).

---

### **Features**

1. **Navigation List**

   - Displays a list of items with a name (`label`) and URL (`url`).
   - Allows reordering of items via drag and drop.
   - Buttons for editing and deleting items.

2. **Navigation Creation and Editing Form**

   - Enables adding new items with the following fields:
     - `Name (label)` – required.
     - `URL (url)` – optional.
   - Supports adding sub-items (recursive tree structure creation).
   - Field validation (`label` – required, `url` – optional but must have a valid format).

3. **Responsiveness**
   - The interface is optimized for various screen sizes.

---

### **Technologies**

- **Next.js** – A React framework with server-side rendering capabilities.
- **Tailwind CSS** – A utility-first CSS framework for styling.
- **dnd-kit** – A library for drag-and-drop functionality.
- **React Hook Form** – Form management and validation.
- **TypeScript** – For safe code typing.
- **React Context API** – For state management.

---

### **System Requirements**

- **Node.js** version 16.x or higher.
- **npm** for package management.

---

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/lukas60055/navibuilder.git
   cd navibuilder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the application in development mode**

   ```bash
   npm run dev
   ```

4. **Open the application in your browser**
   The application will be available at: [http://localhost:3000](http://localhost:3000)

---

### **How to Use the Application**

1. **Adding a Menu Item**

   - Click the "Add Menu Item" button.
   - Fill in the `Name` field (required).
   - Optionally, provide a `URL`.
   - Save the item.

2. **Editing Menu Items**

   - Click the "Edit" button next to an item.
   - Update the details and save.

3. **Adding Sub-Items**

   - Click the "Add Menu Item" button next to an existing item.
   - The new item will be added as a sub-item.

4. **Reordering Items**

   - Drag and drop an item to a new position in the list.

5. **Deleting Items**
   - Click the "Delete" button next to an item.

---

### **Author**

**Łukasz Duda**
Website: [lukaspro.pl](https://lukaspro.pl/)
