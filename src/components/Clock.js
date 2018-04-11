import React, { Component } from 'react';

    class Clock extends Component {

        constructor(props) {
            super(props)

            this.timer = 0;
            this.birthday = props.birthdayFormState.startDate.toString();
            this.getTimeRemaining = this.getTimeRemaining.bind(this);

            this.state = {
                timeRemaining: this.getTimeRemaining(props.birthdayFormState.startDate.toString())
            }

        }

        componentWillRecieveProps(nextProps) {
            console.log(`next props: ${JSON.stringify(nextProps)}`)
        }

        getTimeRemaining(birthday) {
        var bday = new Date(birthday);
        var today = new Date();

        const currentMonth = today.getMonth();
        const birthMonth = bday.getMonth();

        if(birthMonth > currentMonth) {
            //1. month is AFTER the current month
            bday.setFullYear(today.getFullYear());
        } 
        else if (birthMonth < currentMonth) {
            //2. month is B4 the current month
            bday.setFullYear(today.getFullYear() + 1);
        }
        else if(birthMonth == currentMonth) {
            const birthDay = bday.getDate();
            const currentDay = today.getDate();
            if(birthDay > currentDay) {
                //1. day is AFTER the current day
                bday.setFullYear(today.getFullYear());
            } 
            else if (birthDay < currentDay) {
                //2. day is B4 the current day
                bday.setFullYear(today.getFullYear() + 1);
            } else if (birthDay == currentDay) {
                return 0
            }
        }
        
        var distance = bday.getTime() - today.getTime();


        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000); 

        return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
   }

   getAge = function() {
    var bday = new Date(this.birthday);
    let today = new Date();

    var distance = today.getTime() - bday.getTime();
    var daysOld = Math.floor(distance / (1000 * 60 * 60 * 24));
    var yearsOld = Number((daysOld/365).toFixed(0)); 

    return yearsOld
}.bind(this)

componentDidMount() {
    this.timer = setInterval(() => {
        const timeRemaining = this.getTimeRemaining(this.birthday)
        this.setState({ timeRemaining: timeRemaining })
    }, 1000);
}

componentWillUnmount() {
    clearInterval(this.timer);
}


render() {
    const data = this.state.timeRemaining
        return (
            <div>
            {
                this.state.timeRemaining == 0 ?
                    <h1>Happy Birthday!</h1>
                    :
                    <div>
                        <div>
                            <div>DAYS {data.days} </div>
                            <div>HRS {data.hours} </div>
                            <div>MINS {data.minutes} </div>
                            <div>SECS {data.seconds} </div>
                        </div>
                      <div>
                    {<h4>remainging until you are {this.getAge()}</h4>}
                </div>
             </div>
            }
                
        </div>
            )
       
         }
     }



export default Clock;