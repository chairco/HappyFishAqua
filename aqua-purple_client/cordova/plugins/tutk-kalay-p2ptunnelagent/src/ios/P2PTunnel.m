/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

#include <sys/types.h>
#include <sys/sysctl.h>

#import <Cordova/CDV.h>
#import "P2PTunnel.h"


@interface P2PTunnel () {}
@end

@implementation P2PTunnel

@synthesize managedObjectContext = __managedObjectContext;
@synthesize managedObjectModel = __managedObjectModel;
@synthesize persistentStoreCoordinator = __persistentStoreCoordinator;

typedef struct st_AuthData
{
    char szUsername[64];
    char szPassword[64];
} sAuthData;

int gPortMappingIndex;
int gSID;
int gTunnelStatus;
int gMappedPort;

- (void)startP2PTunnel:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:nil];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

+ (NSString*)cordovaVersion
{
    return CDV_VERSION;
}

- (void) StartTunnel
{
    gTunnelStatus = -40000;
    
    [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;
    
    
    sAuthData authData;
    strcpy(authData.szUsername, "Tutk.com");
    strcpy(authData.szPassword, "P2P Platform");
    
    P2PTunnelAgentInitialize(4);
    
    int nErrFromDevice;
    int gSID = P2PTunnelAgent_Connect("BCLKT293KGBG4Y2T111A", (void *)&authData, sizeof(sAuthData), &nErrFromDevice);
    
    
    if(gSID > -1)
    {
        NSLog(@"P2PTunnelAgent_Connect success!");
        
        NSLog(@"Start to find a port to map.");
        gPortMappingIndex = -1;
        //for(int i = 0; i < 100; i++) //try 100 ports for mapping.
        //{
        //    gMappedPort = 10080 + i;
            
        //    gPortMappingIndex = P2PTunnelAgent_PortMapping(gSID, gMappedPort, 80);
        //    if(gPortMappingIndex < 0)
        //    {
        //        NSLog(@"P2PTunnelAgent_PortMapping %d failed : %d", gMappedPort, gPortMappingIndex);
        //    }
        //    else
        //    {
        //       break;
        //    }
        //}
        gPortMappingIndex = P2PTunnelAgent_PortMapping(gSID, 10080, 10080);
        NSLog(@"End port mapping, gMappedPort = %d", gMappedPort);
        
        if(gPortMappingIndex > 0)
        {
            gTunnelStatus = gSID;
        }
        else
            gTunnelStatus = gPortMappingIndex;
    }
    else
    {
        NSLog(@"P2PTunnelAgent_Connect failed ret[%d] error[%d]\n", gSID, nErrFromDevice);
        gTunnelStatus = gSID;
    }
    
    [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
    return;
}

- (void) StopTunnel
{
    NSLog(@"StopTunnel Start");
    
    if(gPortMappingIndex > 0)
        P2PTunnelAgent_StopPortMapping((unsigned int)gPortMappingIndex);
    
    P2PTunnelAgent_Disconnect(gSID);
    P2PTunnelAgentDeInitialize();
    
    NSLog(@"StopTunnel End");
}

- (int) GetTunnelStatus
{
    return gTunnelStatus;
}

- (int) GetMappedPort
{
    return gMappedPort;
}

@end
