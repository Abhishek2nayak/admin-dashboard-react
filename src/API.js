import React from 'react';

export async function getMembers() {
    const res = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
    if (!res.ok) {
        throw {
            message: "Failed to fetch Members", 
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data;
}