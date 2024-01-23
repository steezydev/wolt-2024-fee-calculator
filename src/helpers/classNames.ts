export const classNames = (...classes: (string | undefined | false)[]) => {
    return classes.filter(Boolean).join(' ');
};
