Motivations: Get familiar with creating a REST API with typescript
REST API: Representational State Transfer.

**Advantages: **

1. Flexible and lightweight way to integrate applications and to connect components in microservices architectures.
2. REST APIs can be developed with virtually any language and data formats.

**REST Design Principles:**

1. Uniform interface:
   - All API request from same resource should look the same.
   - API should ensure same pieces of data belongs to only one uniform resource identifier (URI).
   - Resouces should contain every piece of information that the client might need.

2. Client-server decoupling:
   - Client and server applications must be completely independent.
   - Client should only know the URI of requested resource.
   - Server should not modify the client application, only passing requested data via HTTP.
  
3. Statelessness:
   - Each request needs to include all the info necessary for processing.
   - Do not require any server-side sessions.
     
4. Cacheability:
   - Resouces should be cacheable on the client / server side.
   - Server responses should contain info on caching permissions for delivered resource.
   - To improve client side performance while increasing server side scalability.

5. Layered System Architecture:
   - Calls and responses go through different layers.
   - Neither client nor server can tell if it is communicating with end application or intermediary.

6. Code on demand (...):
   - Responses can contain executable code (Java applets)
   - Code should only run on-demand.
     
**
How it works:**
1. Communicatiom through HTTP requests to perform CRUD.
2. GET, POST, PUT, DELETE.
3. Resource representation can be delivered in any data fromat e.g. JSON.
