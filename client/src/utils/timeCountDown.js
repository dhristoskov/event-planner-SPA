export const timeCountDown = (deadline) => {
    const timeLeft = Date.parse(deadline) - Date.parse(new Date());
    let hours = Math.floor( (timeLeft/(1000*60*60)) % 24 );
    let days = Math.floor( timeLeft/(1000*60*60*24) );

    return {
      'total': timeLeft,
      'days': days,
      'hours': hours,
    };
}