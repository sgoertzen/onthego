import React from 'react'
import { Typography } from "@material-ui/core"

export class ParagraphHelper {
    static split(text: string): JSX.Element[] {
        let index = 0
        const paragraphs = text.split(/\n/g).map(t => {
            return <Typography component="p" key={index++} className="post-header-details">{t} &nbsp;</Typography>
        })
        return paragraphs
    }
}