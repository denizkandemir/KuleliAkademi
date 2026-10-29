import React from "react";
import ServiceDetail from "../components/ServiceDetail/ServiceDetail";

export default function ServiceDetailPage({ serviceSlug, service, services }) {
    return <ServiceDetail serviceSlug={serviceSlug} service={service} services={services} />;
}
