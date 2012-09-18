/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    getCamera: function() {
        // ****** for testing in browser ******
        // document.getElementById('takephoto').className = 'animate';
        // document.getElementById('photodetail').className = 'animate';
        // photodb = window.openDatabase("photos","1.0","Photo Database",1000000);
        // photodb.transaction(getTable, onDBError, onGetTableSuccess);
    
        // var storage = window.localstorage;
    
    
        // ****** end browser test *******
    
        var options = {
            quality: 50,
            destinationType : Camera.DestinationType.FILE_URI,
            allowEdit: true
        }
    
        // Start grabbing the lat/lon coordinates
        navigator.geolocation.getCurrentPosition(this.onGeoSuccess,this.onGeoError);
        navigator.camera.getPicture(this.onSuccess, this.onFail,options);        
    },
    onSuccess: function(imageData) {
        var image = document.getElementById('image');
            image.src = imageData;
        
        document.getElementById('takephoto').className = 'animate';
        document.getElementById('photodetail').className = 'animate';
        
        // image.src = "data:image/jpeg;base64," + imageData;        
    },
    onFail: function(message) {
        document.getElementById('message').innerHTML = message;        
    },
    onGeoSucces: function(position) {
	   console.log(position.coords.latitude);
    },
    onGeoError: function(position) {
        alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    },
    titleclick: function() {
        var input = document.createElement('input');
            input.id = "titleinput";
            input.addEventListener('blur',this.onblur);
    
        var title = document.getElementById('imagetitle');
            title.className = "hidden";
        
        document.getElementById('photo').appendChild(input);
        document.getElementById('titleinput').focus();
    },
    onblur: function(e) {
        // console.log('test');
        var title = document.getElementById('imagetitle');
            title.innerHTML = document.getElementById('titleinput').value;
    
        titleinput = document.getElementById('titleinput');
        document.getElementById('photo').removeChild(titleinput);
    
    
        title.className = "visible";
    },
    showCamera: function() {
        document.getElementById('photoslideholder').className = "";
        document.getElementById('photolist').className = "e";        
    },
    showPhotoList: function() {
        document.getElementById('photoslideholder').className = "animate";
        document.getElementById('photolist').className = "animate";   
    }
};