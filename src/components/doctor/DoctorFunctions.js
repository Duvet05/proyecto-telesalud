import { useState, useEffect } from "react";

export function getDoctors() {
    return fetch("http://localhost:8080/rrhh/get/p", { method: 'GET' })
        .then(response => response.json())
        .catch(error => {
            throw error;
        });
}
