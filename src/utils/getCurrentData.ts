export const getCurrentData = () => {
    const newData = new Date();
    newData.setHours(0, 0, 0, 0);
    return newData.getTime();
}