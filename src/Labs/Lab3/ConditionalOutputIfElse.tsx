const ConditionalOutputIfElse = () => {
  const loggedIn = true;
  if (loggedIn) {
    return <h2 id="wd-conditional-output-if-else-welcome">Welcome If Else</h2>;
  } else {
    return (
      <div>
        <h2 id="wd-conditional-output-if-else-login">Please login If Else</h2>
      </div>
    );
  }
};
export default ConditionalOutputIfElse;
