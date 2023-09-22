import React from 'react'
import Header from './Header'
import StatisticLine from './StatisticLine'

export default function Statistics({ good, neutral, bad }) {

    const total = good + neutral + bad

    return (
        total > 0 ?
            <>
                <Header title="Give Feedback" />
                <table>
                    <tbody>
                        <StatisticLine text="good:" value={good}/>
                        <StatisticLine text="neutral:" value={neutral}/>
                        <StatisticLine text="bad:" value={bad}/>
                        <StatisticLine text="all:" value={total}/>
                        <StatisticLine text="average:" value={(good - bad) / total}/>
                        <StatisticLine text="positive:" value={((good / total) * 100) + '%'}/>
                    </tbody>
                </table>
            </>
            :
            <p>No Feedback given</p>
    )
}
