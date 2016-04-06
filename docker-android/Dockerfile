FROM debian
MAINTAINER Miguel de la Cruz <mgdelacroix@gmail.com>

# Locale setup
RUN apt-get update && \
    apt-get install -yq locales ca-certificates wget sudo && \
    rm -rf /var/lib/apt/lists/* && \
    localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8

ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

# Add dev user
RUN useradd user -d /home/user -s /bin/bash && cp -r /etc/skel /home/user && chown user.user -R /home/user

# Dependencies
RUN apt-get update && apt-get install -yq \
                                      tmux \
                                      vim \
                                      git \
                                      xz-utils \
                                      curl \
                                      rlwrap \
                                      sudo \
                                      openjdk-7-jdk

# Configure sudoers
RUN echo "user ALL=(ALL:ALL) NOPASSWD: ALL" > /etc/sudoers

# Install nvm
RUN mkdir -p /opt/nodejs && \
          curl https://nodejs.org/dist/v5.5.0/node-v5.5.0-linux-x64.tar.xz | tar Jx -C /opt/nodejs --strip-components=1 && \
          ln -s /opt/nodejs/bin/node /usr/local/bin/node && ln -s /opt/nodejs/bin/npm /usr/local/bin/npm && \
          /opt/nodejs/bin/npm install -g ionic gulp bower cordova


#ANDROID STUFF
RUN dpkg --add-architecture i386 && apt-get update && apt-get install -y --force-yes expect ant wget libc6-i386 lib32stdc++6 lib32gcc1 lib32ncurses5 lib32z1 qemu-kvm kmod && apt-get clean

# Install Android SDK
RUN cd /opt && wget --output-document=android-sdk.tgz --quiet http://dl.google.com/android/android-sdk_r24.0.2-linux.tgz && tar xzf android-sdk.tgz && rm -f android-sdk.tgz

# Setup environment
ENV ANDROID_HOME /opt/android-sdk-linux
ENV PATH ${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools

# Install sdk elements
ENV PATH ${PATH}:/opt/tools

RUN echo ANDROID_HOME="${ANDROID_HOME}" >> /etc/environment

WORKDIR /opt/tools
COPY android-accept-licenses.sh .

RUN ["/opt/tools/android-accept-licenses.sh", "android update sdk --all --no-ui --filter platform-tools,tools,build-tools-21.1.2,android-19,android-23,addon-google_apis_x86-google-19,extra-android-support,extra-android-m2repository,extra-google-m2repository,sys-img-x86-android-21"]

# RUN chown user:user /opt/android-sdk-linux -R

# Change user
USER user
WORKDIR /home/user
RUN echo "export PATH=/opt/nodejs/bin:$PATH" >> ~/.bashrc
COPY entrypoint.sh .

# PORTS
EXPOSE 8100
EXPOSE 35729

CMD ./entrypoint.sh
