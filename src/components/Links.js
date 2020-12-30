import React, { useState } from 'react';


const Links = ({
    linkList,
    setLinkList,
    tagList
}) => {
    return <div>
        <form>

        </form>
        <table>
            <tr>
                <th>URL</th>
                <th>Click Count</th>
                <th>Comment</th>
                <th>Tags</th>
                <th>Created</th>
            </tr>
            
                {
                    linkList.map(_link => {
                        return <tr>
                                <td>{_link.link}</td>
                                <td>{_link.clickcount}</td>
                                <td>{_link.comment}</td>
                                <td>{_link.tags ? _link.tags.map(tag => {
                                    return <p>{tag.tag}</p>
                                }) : "None"}</td>
                                <td>{_link.dateCreated}</td>
                             </tr>
                    })
                }
        </table>
    </div>
}

export default Links;