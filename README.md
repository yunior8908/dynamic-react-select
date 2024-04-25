<style>
    table {
        width: 100%;
       
    }

    thead {
        background-color: #ccc;
    }
</style>

# Dynamic React Select

A react application

## Usage

To use the dynamic-react-select component, follow these steps:

1.  Install the package using npm or yarn:
    **npm:**

    ```bash
    npm install dynamic-react-select
    ```

    **yarn:**

    ```bash
    yarn add dynamic-react-select
    ```

    **pnpm:**

    ```bash
    pnpm add dynamic-react-select
    ```

2.  Import the component in your project:

    ```tsx
    import DynamicReactSelect from 'dynamic-react-select'
    ```

3.  Use the component in your code:

    ```tsx
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ]

    const MyComponent = () => {
      return (
        <div>
          <h1>My Component</h1>
          <DynamicReactSelect name='field-name' options={options} />
        </div>
      )
    }

    export default MyComponent
    ```

4.  Customize the component by passing props as needed.

That's it! You can now use the `DynamicReactSelect` component in your project. Feel free to explore the available props and customize it according to your requirements.

### Props

|       Prop Name        |                                                                                                                                                         Default                                                                                                                                                         | Required  | Description                                                                                                                                      |
| :--------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------: | ------------------------------------------------------------------------------------------------------------------------------------------------ |
|      **options**       |                                                                                                                                      Empty Array[] {value: string, label: string}>                                                                                                                                      | **true**  | List of elements to rendering                                                                                                                    |
|       **value**        |                                                                                                                                                          null                                                                                                                                                           | **false** | Item of the list **{value: string, label: string}** or **null**                                                                                  |
|        **name**        |                                                                                                                                                        undefined                                                                                                                                                        | **true**  | Field name                                                                                                                                       |
|      **onChange**      |                                                                                                                                                        undefined                                                                                                                                                        | **false** | Triggered function when is item from the list is selected                                                                                        |
|   **onInputChange**    |                                                                                                                                                        undefined                                                                                                                                                        | **false** | Triggered function when the input for search changes                                                                                             |
|    **isSearchable**    |                                                                                                                                                          false                                                                                                                                                          | **false** | Flag to show or not the search input field                                                                                                       |
|     **isLoading**      |                                                                                                                                                          false                                                                                                                                                          | **false** | Flag to display a status loading with **loadingLabel** prop                                                                                      |
| **clearValueOnSelect** |                                                                                                                                                          false                                                                                                                                                          | **false** | Flag that allow to clear the selection, selecting the selected item from the list                                                                |
|  **onReachThreshold**  |                                                                                                                                                      function void                                                                                                                                                      | **false** | triggered function when item from the threshold config enters the view                                                                           |
|     **threshold**      |                                                                                                                                                            3                                                                                                                                                            | **false** | Index of the item from the bottom of the list that is being watched when is in or out the view                                                   |
|       **async**        |                                                                                                                                                          false                                                                                                                                                          | **false** | If **true**, it calls **onInputChange** when the search input changes; if **false**, it calls a local function that filters the list of options. |
|      **classes**       | <div style="text-align:left;"><spn>{</spn><br><span>&nbsp;&nbsp;root: ''</span> <br><span>&nbsp;&nbsp;select: ''</span> <br><span>&nbsp;&nbsp;input: ''</span> <br><span>&nbsp;&nbsp;list: ''</span> <br><span>&nbsp;&nbsp;listItem: ''</span> <br><span>&nbsp;&nbsp;listItemActive: ''</span> <br><span>}</span></div> | **false** | Styles class for the different components within                                                                                                 |
|    **loadingLabel**    |                                                                                                                                                        'loading'                                                                                                                                                        | **false** | Custom text displayed when component status 'loading = true'                                                                                     |
|    **placeholder**     |                                                                                                                                                      'Select one'                                                                                                                                                       | **false** | Custom text displayed when is no item selected                                                                                                   |
