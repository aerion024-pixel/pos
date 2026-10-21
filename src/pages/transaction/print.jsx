import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../../components/ui/card";


import api from "@/services/api";
import { Button } from "@/components/ui/button";

const PrintTransaction = () =>{

    const [searchParams] = useSearchParams()
    const navigate = useNavigate

    const orderId = searchParams.get("order_id")
    const status = searchParams.get("transaction_status")

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const handlePrint = () => {
        window.print()
    }

    return(
        <>
        <div className="max-w-md mx-auto my-6 space-y-4">
            <div className="flex items-center justify-between print:hidden">
                <Button variant="outline" onClick={() => navigate("/transaction")}>
                    back
                </Button>
                <Button onClick={handlePrint} size="sm" className="bg-primary">
                print struck
                </Button>
            </div>
        </div>
        <Card className="border border-border/80 shadow-none font-mono text-xs p-6 bg-white text-black print:border-none">
            <CardHeader className="text-center p-0 pb-4 border-border-dashed border-zinc-400">
                <CardTitle className="text-base font-bold uppercase tracking-wider">
                    POS PPKD Jakarta Pusat
                </CardTitle>
                <p className="text-[11px] text-zinc-600">Jl karet baru</p>
                <p className="text-[11px] text-zinc-500 mt-1">{new Date().toLocaleString("id-ID")}</p>
            </CardHeader>
            <CardContent className="p-0 pt-3 space-y-3">
                <div className="-space-y-0.5 text[11px]">
                    <div className="justify-between items-center">
                        <span>order number</span>
                        <span className="uppercase">{orderId}</span>
                    </div>
                    <div className="justify-between items-center">
                        <span>payment method</span>
                        <span className="uppercase">qris</span>
                    </div>
                </div>
                <div className="border-t border-dashed border-zinc-400 pt-2 space-y-2">
                    <div className="flex justify-between items-center">
                        <div className="font-semibold">Mi Sedap</div>
                        <div className="text[10px] text-zinc-600">
                        1 x Rp. 100000
                        </div>
                    </div>
                    <div className="font-medium">
                        Rp. 100000
                    </div>
                    <div className="border-t border-dashed border-zinc-400 pt-2 space-y-1">
                        <div className="flex justify-between">
                            <span>tax (10%)</span>
                            <span>Rp.10000</span>
                        </div>
                    </div>
                    <div className="border-t border-dashed border-zinc-400 pt-2 space-y-1">
                        <div className="flex justify-between">
                            <span>total</span>
                            <span>Rp.110000</span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-dashed border-zinc-400">
                    <p className="text-semibold">thankyou</p>
                    <p className="text-[10px] text-zinc-500">
                        please come back again
                    </p>
                </div>
            </CardContent>
        </Card>
        </>
    )
}

export default PrintTransaction