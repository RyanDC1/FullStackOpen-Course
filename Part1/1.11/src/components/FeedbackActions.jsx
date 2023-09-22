import React from 'react'
import { FeedbackValues } from '../utils/constants'
import Button from './Button'

export default function FeedbackActions({ onFeedbackClick }) {

    return (
        <>
            <Button 
                onClick={() => onFeedbackClick(FeedbackValues.GOOD)}>
                Good
            </Button>
            <Button 
                onClick={() => onFeedbackClick(FeedbackValues.NEUTRAL)}>
                Neutral
            </Button>
            <Button 
                onClick={() => onFeedbackClick(FeedbackValues.BAD)}>
                Bad
            </Button>
        </>
    )
}
