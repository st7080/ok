
const express = require('express') // 引入express框架 express文档：https://www.expressjs.com.cn/
const bodyParser = require('body-parser') // 获取Post接口参数 body-parser文档 https://www.npmjs.com/package/body-parser
const Web3 = require('web3'); // 引入Web3包
const fs = require('fs');
const port = 8888
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express()
const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));
// 创建Post请求路由
app.post('/sendshark', urlencodedParser, async (req, res) => {
    const { Contract_abi } = require('./config') 
    const Contract_Address="0x416f1d70c1c22608814d9f36c492efb3ba8cad4c";
    const { private_key, Token_id, Receiveaddress } = req.body
    const num = Object.getOwnPropertyNames(req.body).length
    const checkname = Object.keys(req.body);
    if (checkname[0] == 'private_key') {
        if (checkname[1] == 'Token_id') {
            if (checkname[2] == 'Receiveaddress') {
                if (num == 3) {
                    const key = JSON.stringify(private_key).length;
                    const id = JSON.stringify(Token_id).length;
                    const addr = JSON.stringify(Receiveaddress).length;
                    if (key == 66) {
                        if (id == 8) {
                            if (addr == 44) {
                                const Sender_account = web3.eth.accounts.privateKeyToAccount(private_key)
                                const Send_address = Sender_account.address
                                const TransfertokenTo = async (from, to, tokenId) => {
                                    const Contract_instance = new web3.eth.Contract(Contract_abi, Contract_Address)
                                    // 此处变量需根据ABI文件来设置
                                    const transaction = Contract_instance.methods.transferFrom(from, to, web3.utils.toHex(tokenId));
                                    const options = {
                                        data: transaction.encodeABI(),
                                        gas: 150000,//gas 默认 100000
                                        gasPrice: 5000000000,//gasprice
                                        to: Contract_Address//合约地址
                                    };
                                    // 交易签名
                                    const signed = await web3.eth.accounts.signTransaction(options, private_key);
                                    // 捕获异常，防止服务断连
                                    try {
                                        //交易发送
                                        const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
                                        return receipt
                                    } catch (error) {
                                        // 返回错误信息
                                        return error
                                    }
                                }
                                const result = await TransfertokenTo(Send_address, Receiveaddress, Token_id)
                                res.send(result)
                            }
                            else {
                                res.send("ERR接收地址错误")
                            }
                        }
                        else {
                            res.send("ERR请检查参数：ID>接收地址")
                        }
                    } else {
                        res.send('ERR请检查参数：密钥>ID>接收地址')
                    }
                } else {
                    res.send('ERR请检查数据格式B:private_key=私钥&Token_id=ID&Receiveaddress=接收地址')
                }
            } else {
                res.send('ERR请检查数据格式')
            }
        } else {
            res.send('ERR请检查数据格式')
        }


    } else {
        res.send('ERR请检查数据格式')
    }
})//这里不能动哦
app.post('/sendcoin', urlencodedParser, async (req, res) => {
    const { key, coin, amount, address } = req.body
    const num = Object.getOwnPropertyNames(req.body).length
    const checkname = Object.keys(req.body);
    if (num == 4) {
        if ((checkname[0] === 'key') || (checkname[1] === 'address') || (checkname[2] === 'amount') || (checkname[3] === 'coin')) {
            const key_num = JSON.stringify(key).length;
            const addr_num = JSON.stringify(address).length;
            if (key_num == 66) {
                if (addr_num == 44) {
                    if (coin == "bnb") {
                        const TransfertokenTo = async (receive_address, amount) => {
                            const options = {
                                to: receive_address,
                                value: web3.utils.toWei(amount, 'Ether'),
                                gas: 100000,//gas 默认 100000
                            };
                            // 交易签名
                            const signed = await web3.eth.accounts.signTransaction(options, key);
                            // 捕获异常，防止服务断连
                            try {
                                //交易发送
                                const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
                                return receipt
                            } catch (error) {
                                // 返回错误信息
                                return error
                            }
                        }
                        const result = await TransfertokenTo(address, amount)
                        res.send(result)
                    }

                    if (coin == "busd") {
                        var Contract_abi = JSON.parse(fs.readFileSync("./demo/busd.json").toString());
                        var Contract_Address = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
                        const Sender_account = web3.eth.accounts.privateKeyToAccount(key)
                        const Send_address = Sender_account.address
                        const TransfertokenTo = async (receive_address, amount) => {
                            const Contract_instance = new web3.eth.Contract(Contract_abi, Contract_Address)
                            // 此处变量需根据ABI文件来设置
                            const transaction = Contract_instance.methods.transfer(receive_address, web3.utils.toWei(amount, 'Ether'));
                            const options = {
                                data: transaction.encodeABI(),
                                gas: 100000,//gas 默认 100000
                                gasPrice: 5000000000,//gasprice
                                to: Contract_Address//合约地址
                            };
                            // 交易签名
                            const signed = await web3.eth.accounts.signTransaction(options, key);
                            // 捕获异常，防止服务断连
                            try {
                                //交易发送
                                const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
                                return receipt
                            } catch (error) {
                                // 返回错误信息
                                return error
                            }
                        }

                        const result = await TransfertokenTo(address, amount)
                        res.send(result)

                    }
                    if (coin == "usdt") {
                        var Contract_abi = JSON.parse(fs.readFileSync("./demo/usdt.json").toString());
                        var Contract_Address = '0x55d398326f99059fF775485246999027B3197955';
                        const Sender_account = web3.eth.accounts.privateKeyToAccount(key)
                        const Send_address = Sender_account.address
                        const TransfertokenTo = async (receive_address, amount) => {
                            const Contract_instance = new web3.eth.Contract(Contract_abi, Contract_Address)
                            // 此处变量需根据ABI文件来设置
                            const transaction = Contract_instance.methods.transfer(receive_address, web3.utils.toWei(amount, 'Ether'));
                            const options = {
                                data: transaction.encodeABI(),
                                gas: 100000,//gas 默认 100000
                                gasPrice: 5000000000,//gasprice
                                to: Contract_Address//合约地址
                            };
                            // 交易签名
                            const signed = await web3.eth.accounts.signTransaction(options, key);
                            // 捕获异常，防止服务断连
                            try {
                                //交易发送
                                const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
                                return receipt
                            } catch (error) {
                                // 返回错误信息
                                return error
                            }
                        }
                        const result = await TransfertokenTo(address, amount)
                        res.send(result)

                        
                    }
                    if (coin == "sea") {
                        var Contract_abi = JSON.parse(fs.readFileSync("./demo/sea.json").toString());
                        var Contract_Address = '0x26193c7fa4354ae49ec53ea2cebc513dc39a10aa';
                        const Sender_account = web3.eth.accounts.privateKeyToAccount(key)
                        const Send_address = Sender_account.address
                        const TransfertokenTo = async (receive_address, amount) => {
                            const Contract_instance = new web3.eth.Contract(Contract_abi, Contract_Address)
                            // 此处变量需根据ABI文件来设置
                            const transaction = Contract_instance.methods.transfer(receive_address, web3.utils.toWei(amount, 'Ether'));
                            const options = {
                                data: transaction.encodeABI(),
                                gas: 100000,//gas 默认 100000
                                gasPrice: 5000000000,//gasprice
                                to: Contract_Address//合约地址
                            };
                            // 交易签名
                            const signed = await web3.eth.accounts.signTransaction(options, key);
                            // 捕获异常，防止服务断连
                            try {
                                //交易发送
                                const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
                                return receipt
                            } catch (error) {
                                // 返回错误信息
                                return error
                            }
                        }
                        const result = await TransfertokenTo(address, amount)
                        res.send(result)

                    }
                    if (coin == 'sss') {
                        var Contract_abi = JSON.parse(fs.readFileSync("./demo/sss.json").toString());
                        var Contract_Address = '0xc3028fbc1742a16a5d69de1b334cbce28f5d7eb3';
                        const Sender_account = web3.eth.accounts.privateKeyToAccount(key)
                        const Send_address = Sender_account.address
                        const TransfertokenTo = async (receive_address, amount) => {
                            const Contract_instance = new web3.eth.Contract(Contract_abi, Contract_Address)
                            // 此处变量需根据ABI文件来设置
                            const transaction = Contract_instance.methods.transfer(receive_address, web3.utils.toWei(amount, 'Ether'));
                            const options = {
                                data: transaction.encodeABI(),
                                gas: 100000,//gas 默认 100000
                                gasPrice: 5000000000,//gasprice
                                to: Contract_Address//合约地址
                            };
                            // 交易签名
                            const signed = await web3.eth.accounts.signTransaction(options, key);
                            // 捕获异常，防止服务断连
                            try {
                                //交易发送
                                const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
                                return receipt
                            } catch (error) {
                                // 返回错误信息
                                return error
                            }
                            
                        }
                        const result = await TransfertokenTo(address, amount)
                            res.send(result)
                    }

                }
            } else {
                res.send('Submit data key error')
            }
        } else {
            res.send('Submit type_name error')
        }
    } else {
        res.send('Submitted format error')
    }
})




































// 监听端口
app.listen(port, () => {
    console.log(`starting at port http://localhost:${port}`);
});

