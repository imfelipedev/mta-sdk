# [MTA SDK](https://github.com/zFelpszada/mta-sdk)

Library created with the purpose of streamlining development, enabling developers to establish a direct connection with MTA:SA more efficiently.

# Resources

-   Execute functions
-   Fetch data from servers or from a server.

## API Documentation

#### Import SDK.

```js
import SDK from "mta-sdk";
```

#### Retrieve all servers and their information.

```js
const sdk = new SDK();
const result = await sdk.api.getAll();
```

#### Retrieve information for the ip server.

```js
const sdk = new SDK();
const result = await sdk.api.getFromIP(ip);
```

| Parameter | Type     | Description                                                                         |
| :-------- | :------- | :---------------------------------------------------------------------------------- |
| `IP`      | `string` | **Required**. The IP of the server from which you want to retrieve the information. |

#### Retrieve information for the specified server.

```js
const sdk = new SDK();
const result = await sdk.api.getFromIPandPort(ip, port);
```

| Parameter | Type     | Description                                                                         |
| :-------- | :------- | :---------------------------------------------------------------------------------- |
| `IP`      | `string` | **Required**. The IP of the server from which you want to retrieve the information. |
| `PORT`    | `string` | **Required**. The PORT connection in server from which.                             |

#### Execute an HTTP function on the server.

Set up the SDK first to execute the function correctly.

```js
const sdk = new SDK(IP, PORT, USERNAME, PASSWORD, PROTOCOL);
```

| Parameter  | Type     | Description                                                                         |
| :--------- | :------- | :---------------------------------------------------------------------------------- |
| `IP`       | `string` | **Required**. The IP of the server from which you want to retrieve the information. |
| `PORT`     | `string` | **Required**. The HTTP PORT connection in server from which.                        |
| `USERNAME` | `string` | **Required**. Admin account username.                                               |
| `PASSWORD` | `string` | **Required**. Admin account password.                                               |

After the proper setup, provide the parameters correctly to execute your function.

```js
const sdk = new SDK(IP, PORT, USERNAME, PASSWORD, PROTOCOL);
const result = await sdk.mta.execute(resource, functionName, object);
```

| Parameter      | Type     | Description                                                                   |
| :------------- | :------- | :---------------------------------------------------------------------------- |
| `RESOURCE`     | `string` | **Required**. Name of the resource that contains the function to be executed. |
| `functionName` | `string` | **Required**. Function name to be executed.                                   |
| `object`       | `object` | **Required**. object containing the information to be sent.                   |

#### Start socket.

```js
const sdk = new SDK();
sdk.socket.init(1337, "0.0.0.0", () => {
    console.log("Socket open in port 1337");
});
```

| Parameter  | Type       | Description                                    |
| :--------- | :--------- | :--------------------------------------------- |
| `port`     | `string`   | **Required**. Port to open socket.             |
| `ip`       | `string`   | **Required**. IP to open socket..              |
| `callback` | `function` | **Required**. Function to receive opening data |

### Here's a basic example with plain socket:

```js
sdk.socket.on("connection", socket => {
    console.log("new client");

    socket.on("data", buffer => {
        const message = buffer.toString().trim();
        console.log(message);
    });

    socket.write("Hello from SDK-Socket");
});
```

## Authors

-   [@zFelpszada](https://github.com/zFelpszada)

## License

[MIT](https://choosealicense.com/licenses/mit/)
