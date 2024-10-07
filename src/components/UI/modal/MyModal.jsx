import classes from './myModal.module.scss';

export function MyModal({ children, setVisible, visible }) {
  const rootClasses = [classes.myModal];

  if (visible) {
    rootClasses.push(classes.active);
  }

  const onClickBackModalHidden = () => {
    setVisible((prev) => !prev);
  };
  const onClickFormStopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className={rootClasses.join(' ')} onClick={onClickBackModalHidden}>
        <div className={classes.myModalContent} onClick={onClickFormStopPropagation}>
          {children}
        </div>
      </div>
    </>
  );
}
