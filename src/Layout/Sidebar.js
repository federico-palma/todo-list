import classes from "./Sidebar.module.css"

const Sidebar = () => {
  return (<div className={classes.sidebar}>
    <ul className={classes["project-list"]}>
      <li >All lists</li>
      <li>Add new Project</li>
    </ul>
  </div>);
}
 
export default Sidebar;